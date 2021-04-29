const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home-controller');
const userController = require('./controllers/user-controller');
const newsController = require('./controllers/news-controller');
const dashboardController = require('./controllers/dashboard-controller');
const apiController = require('./controllers/api-controller');
const errorController = require('./controllers/error-controller');
const adminController = require('./controllers/admin-controller');

const isLoggedMiddleware = require('./middlewares/isLogged-middleware');
const isAdminMiddleware = require('./middlewares/isAdmin-middleware');
const envMiddleware = require('./middlewares/environment-middleware');
const recaptchaMiddleware = require('./middlewares/recaptcha-middleware');

routes.use(envMiddleware);

routes.get('/', isLoggedMiddleware.notLogged, userController.index);
routes.get('/login', isLoggedMiddleware.notLogged, userController.index);
routes.get('/recovery', isLoggedMiddleware.notLogged, userController.index);
routes.get('/register', isLoggedMiddleware.notLogged, userController.index);

routes.get('/home', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/change-password', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/recovery-numeric-password', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/guildmark', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/ranking-players', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/ranking-cities', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/donate', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/donate-rules', isLoggedMiddleware.logged, dashboardController.home);
routes.get('/logout', isLoggedMiddleware.logged, userController.logout);


/**
 * API
 */

//USER

routes.post('/recovery', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.recovery);
routes.post('/register', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.register);
routes.post('/login', recaptchaMiddleware, isLoggedMiddleware.notLogged, apiController.login);
routes.post('/guildmark', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.guildmark);
routes.post('/change-password', recaptchaMiddleware, isLoggedMiddleware.logged, apiController.changepassword);

//ADMIN


routes.get('/donate-packages', isLoggedMiddleware.logged, isAdminMiddleware, apiController.getdonatepackages);
routes.post('/donate-packages', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonatepackage);
routes.post('/update-donate-packages/:id', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonatepackage);
routes.get('/update-donate-packages/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.getupdonatepackage);
routes.get('/delete-donate-packages/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.deletedonatepackage);

//routes.get('/donate-items', isLoggedMiddleware.logged, isAdminMiddleware, apiController.getdonateitems);
routes.get('/list-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.listdonateitems);
routes.post('/donate-items', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.createdonateitem);
routes.post('/update-donate-items', recaptchaMiddleware, isLoggedMiddleware.logged, isAdminMiddleware, apiController.updatedonateitems);
routes.get('/update-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.getupdonateitem);
routes.get('/delete-donate-items/:id', isLoggedMiddleware.logged, isAdminMiddleware, apiController.deletedonateitem);


routes.use(errorController.error404);

module.exports = routes;