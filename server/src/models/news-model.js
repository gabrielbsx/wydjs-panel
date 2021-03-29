'use strict';
const { Model, DataTypes } = require('sequelize');

class News extends Model {
  static init(sequelize) {
    super.init({
        title: DataTypes.STRING(100),
        slug: DataTypes.STRING(50),
        content: DataTypes.TEXT,
        category: DataTypes.INTEGER,
        name: DataTypes.STRING(50),
        created_at: DataTypes.DATE,
        updated_at: DateTypes.DATE,
    }, {
      sequelize,
      modelName: 'news'
    });
    return this;
  }
}
  
module.exports = News;