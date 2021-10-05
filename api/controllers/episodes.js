const connectToDatabase = require('../../config/mongodb');

module.exports = () => {
  const { getPodcastInfos } = require('../../infra/getEpisodes');
  const controller = {};

  controller.getEpisodes = async (req, res) => {
    const { db } = await connectToDatabase();
    const dataFromDatabase = await db.collection('episodes').find().sort({ _id: -1 }).toArray();
    const { data, hasNewEpisode } = await getPodcastInfos(dataFromDatabase);

    if (hasNewEpisode) {
      await db.collection('episodes').insertMany(data);
      dataFromDatabase = await db.collection('episodes').find().toArray();
    }

    return res.status(200).json(dataFromDatabase);
  };

  controller.getEpisodeBySlug = async (req, res) => {
    const slug = req.params.slug;
    const { db } = await connectToDatabase();
    const data = await db.collection('episodes').findOne({ slug });

    if (!data) {
      return res.status(404).end(`Não há dados referentes ao parâmetro: ${slug}`);
    }

    return res.status(200).json(data);
  };

  return controller;
};
