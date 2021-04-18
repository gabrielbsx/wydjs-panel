const Sequelize = require('sequelize');
const dbConfig = require('./config/database');
const userModel = require('./models/users-model');
const newsModel = require('./models/news-model');
const donatepackagesModel = require('./models/donatepackages-model');
const donateitemsModel = require('./models/donateitems-model');

const conn = new Sequelize(dbConfig);

userModel.init(conn);
newsModel.init(conn);
donatepackagesModel.init(conn);
donateitemsModel.init(conn);
//userModel.associate(conn.models);

module.exports = conn;