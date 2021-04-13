const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');
const dashboardController = require('./controllers/dashboard-controller');
const errorController = require('./controllers/error-controller');

const isLoggedMiddleware = require('./middlewares/isLogged-middleware');
const isAdminMiddleware = require('./middlewares/isAdmin-middleware');
const envMiddleware = require('./middlewares/environment-middleware');
const recaptchaMiddleware = require('./middlewares/recaptcha-middleware');

routes.use(envMiddleware);

routes.get('/', isLoggedMiddleware.notLogged, homeController);

routes.get('/login', isLoggedMiddleware.notLogged, userController.login);
routes.post('/login', recaptchaMiddleware, isLoggedMiddleware.notLogged, userController.trylogin);

routes.get('/register', isLoggedMiddleware.notLogged, userController.register);
routes.post('/register', recaptchaMiddleware, isLoggedMiddleware.notLogged, userController.tryregister);

routes.get('/recovery', isLoggedMiddleware.notLogged, userController.recovery);
routes.post('/recovery', recaptchaMiddleware, isLoggedMiddleware.notLogged, userController.tryrecovery);

routes.get('/logout', isLoggedMiddleware.logged, userController.logout);

routes.get('/home', isLoggedMiddleware.logged, dashboardController.home);

routes.get('/guildmark', isLoggedMiddleware.logged, dashboardController.guildmark);

routes.use(errorController.error404);

module.exports = routes;