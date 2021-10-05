module.exports = app => {
  const controller = require('../controllers/getEpisodes')();

  app.route('/api/episodes').get(controller.getEpisodes);
};
