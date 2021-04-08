const { Router } = require('express');
const routes = Router();

const homeController = require('./controllers/home.controller');

routes.get('/', homeController.index);

module.exports = routes;