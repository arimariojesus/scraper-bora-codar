const puppeteer = require('puppeteer');
const userAgent = require('user-agents');
const slugify = require('slugify');

function invertArray(arr = []) {
  return arr.reduce((acc, curr) => [curr, ...acc], []);
}

function convertTimeToSeconds(time) {
  const [minutes, seconds] = time.split(':');
  const fullSeconds = (Number(minutes) * 60) + Number(seconds);

  return fullSeconds;
}

async function getPodcastInfos(podcastsFromDatabase = []) {
  const baseURL = `https://anchor.fm/codar-app/episodes/11-Trade-do-Cientista-de-Dados-eu7qtc`;
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.setUserAgent(userAgent.toString());
  await page.goto(baseURL);
  let hasNewEpisode = false;

  const linkList = await page.evaluate(() => {
    const anchors = [];
    
    document.querySelectorAll('.styles__episodeFeed___3mOKz > div a:first-of-type').forEach(a => {
      anchors.push(a.href);
    });

    return anchors;
  });

  const podcastList = await page.evaluate(() => {
    const podcasts = [];

    document.querySelectorAll('.styles__episodeFeed___3mOKz > div').forEach(async div => {
      document.querySelector('.styles__expander___1NNVb.styles__expander--dark___3Qxhe > div > div').click();

      const thumbnail = div.querySelector('.styles__episodeImage___tMifW > img').getAttribute('src');
      const title = div.querySelector('.styles__episodeHeading___29q7v > div').textContent;
      const description = div.querySelector('.styles__episodeDescription___C3oZg > div').innerHTML.toString();
      const publishedAt = div.querySelector('.styles__episodeCreated___1zP5p').textContent;
      
      const podcastObj = {
        file: {
          url: '',
          duration: 0,
        },
        thumbnail,
        title,
        slug: '',
        description,
        published_at: publishedAt,
      };

      podcasts.push(podcastObj);
    });

    return podcasts;
  });

  // Verifica se há novos episódios
  const lastEpisodeTitle = podcastList[0]?.title;
  if (podcastsFromDatabase.length > 1) {
    hasNewEpisode = podcastsFromDatabase?.find(item => item.title === lastEpisodeTitle) ? false : true;
  }else {
    hasNewEpisode = true;
  }

  if (hasNewEpisode) {
    const invertedLinkList = invertArray(linkList);
    const invertedPodcastList = invertArray(podcastList);
    let indexOfLastEpisode = 0;

    if (podcastsFromDatabase.length > 1) {
      const lastEpisodeTitleFromDatabase = podcastsFromDatabase[podcastsFromDatabase.length - 1].title;
      indexOfLastEpisode = invertedPodcastList.findIndex(item => item.title === lastEpisodeTitleFromDatabase) + 1;
    }

    // Captura dos dados dos áudios
    const audios = [];

    for (let i = indexOfLastEpisode; i < invertedLinkList.length; i++) {
      await page.goto(invertedLinkList[i]);

      const audioData = await page.evaluate(async () => {
        const audioElement = document.getElementsByTagName('audio')[0];
        const durationElement = document.querySelector('.styles__episodeDuration___3f8yQ');

        const src = audioElement.src;
        const duration = durationElement.innerText;
  
        return {
          src,
          duration,
        };
      });
  
      audios.push(audioData);
    }

    // Mapeia os dados dos podcasts
    const data = invertedPodcastList.slice(indexOfLastEpisode).map((item, index) => {
      const podcast = item;
      podcast.slug = slugify(podcast.title, { lower: true, strict: true });
      podcast.file = {
        url: audios[index].src,
        duration: convertTimeToSeconds(audios[index].duration),
      };
  
      return podcast;
    });
  
    await page.close();
    await browser.close();

    return { data, hasNewEpisode };
  } else {
    await page.close();
    await browser.close();

    return { data: podcastsFromDatabase, hasNewEpisode };
  }
}

module.exports = {
  getPodcastInfos
};
