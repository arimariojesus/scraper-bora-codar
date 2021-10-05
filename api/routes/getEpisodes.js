module.exports = app => {
  const controller = require('../controllers/episodes')();

  app.route('/api/episodes').get(controller.getEpisodes);

  app.route('/api/episodes/:slug').get(controller.getEpisodeBySlug);
};
