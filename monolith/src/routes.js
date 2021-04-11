const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');
const dashboardController = require('./controllers/dashboard-controller');
const errorController = require('./controllers/error-controller');

const isLogged = require('./middlewares/isLogged-middleware');
const isAdmin = require('./middlewares/isAdmin-middleware');

routes.get('/', isLogged.notLogged, homeController);

routes.get('/login', isLogged.notLogged, userController.login);
routes.post('/login', isLogged.notLogged, userController.trylogin);

routes.get('/register', isLogged.notLogged, userController.register);
routes.post('/register', isLogged.notLogged, userController.tryregister);

routes.get('/recovery', isLogged.notLogged, userController.recovery);
routes.post('/recovery', isLogged.notLogged, userController.tryrecovery);

routes.get('/logout', isLogged.logged, userController.logout);

routes.get('/home', isLogged.logged, dashboardController.home);

routes.use(errorController.error404);

module.exports = routes;