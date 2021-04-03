const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');

const authenticate = require('./middlewares/authenticate-middleware');

routes.get('/', homeController);

routes.route('/news')
        .get(newsController.read);

routes.use(authenticate);

routes.route('/user')
        .post(userController.create)
        .get(userController.read)
        .put(userController.update)
        .delete(userController.delete);

routes.route('/news')
        .post(newsController.create)
        .put(newsController.update)
        .delete(newsController.delete);


module.exports = routes;