const Sequelize = require('sequelize');
const dbConfig = require('./config/database');
const userModel = require('./models/users-model');
const newsModel = require('./models/news-model');

const conn = new Sequelize(dbConfig);

userModel.init(conn);
newsModel.init(conn);

module.exports = conn;