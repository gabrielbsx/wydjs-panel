"use strict";
const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(50),
        username: DataTypes.STRING(12),
        password: DataTypes.STRING(60),
        email: DataTypes.STRING(100),
        access: DataTypes.INTEGER(1),
        status: DataTypes.INTEGER(1),
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "users",
      }
    );
    return this;
  }
}

module.exports = Users;
