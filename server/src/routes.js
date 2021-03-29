const { Router } = require('express');
const routes = Router();

/**
 * CONTROLLERS
 */
const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');

/**
 * MIDDLEWARES
 */
const authenticate = require('./middlewares/authenticate');

routes.get('/', homeController);

routes  .routes('/news')
        .post(newsController.create)
        .get(newsController.reade)
        .put(newsController.update)
        .delete(newsController.delete);

//routes.use(authenticate);

routes  .route('/users')
        .post(userController.create)
        .get(userController.read)
        .put(userController.update)
        .delete(userController.delete);

module.exports = routes;