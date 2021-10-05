module.exports = () => {
  const { getPodcastInfos } = require('../../infra/getEpisodes');
  const controller = {};

  controller.getEpisodes = async (req, res) => {
    const episodes = await getPodcastInfos();
    return res.status(200).json(episodes);
  };

  return controller;
};
