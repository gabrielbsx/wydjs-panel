const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');
const dashboardController = require('./controllers/dashboard-controller');
const apiController = require('./controllers/api-controller');
const errorController = require('./controllers/error-controller');

const isLoggedMiddleware = require('./middlewares/isLogged-middleware');
const isAdminMiddleware = require('./middlewares/isAdmin-middleware');
const envMiddleware = require('./middlewares/environment-middleware');
const recaptchaMiddleware = require('./middlewares/recaptcha-middleware');

routes.use(envMiddleware);

routes.get('/', isLoggedMiddleware.notLogged, homeController);
routes.get('/login', isLoggedMiddleware.notLogged, userController.login);
routes.get('/register', isLoggedMiddleware.notLogged, userController.register);
routes.get('/recovery', isLoggedMiddleware.notLogged, userController.recovery);
routes.get('/logout', isLoggedMiddleware.logged, userController.logout);

routes.get('/home', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/guildmark', isLoggedMiddleware.logged, dashboardController.guildmark);
routes.get('/change-password', isLoggedMiddleware.logged, dashboardController.changepassword);
routes.get('/donate', isLoggedMiddleware.logged, dashboardController.donate);
routes.get('/donate-rules', isLoggedMiddleware.logged, dashboardController.changepassword, dashboardController.donaterules);
routes.get('/ranking-players', isLoggedMiddleware.logged, dashboardController.rankingplayers);
routes.get('/ranking-cities', isLoggedMiddleware.logged, dashboardController.rankingplayers);
routes.get('/recovery-numeric-password', isLoggedMiddleware.logged, dashboardController.changepassword);

/**
 * ADMIN
 */

routes.get('/donate-packages', isLoggedMiddleware.logged, isAdminMiddleware, dashboardController.donate);

/**
 * API
 */

routes.post('/recovery', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.recovery);
routes.post('/register', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.register);
routes.post('/login', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.login);

routes.post('/guildmark', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.guildmark);
routes.post('/changepassword', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.changepassword);

/**
 * ADMIN
 */


routes.use(errorController.error404);

module.exports = routes;