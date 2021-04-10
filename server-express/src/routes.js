const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');
const errorController = require('./controllers/error-controller');

routes.get('/', homeController);

routes.route('/login')
        .get(userController.login)
        .post(userController.read);

routes.route('/register')
        .get(userController.register)
        .post(userController.create);

routes.route('/recovery')
        .get(userController.recovery)
        .post(userController.get);

routes.use(errorController.error404);

module.exports = routes;