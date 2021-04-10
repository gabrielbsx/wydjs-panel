const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');

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

module.exports = routes;