"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { v4 } = require('uuid');

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING(12),
        password: DataTypes.STRING(60),
        email: DataTypes.STRING(100),
        name: DataTypes.STRING(50),
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
    this.addHook('beforeSave', async user => {
      if (user.password) {
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(user.password, salt);
      }
      user.id = v4();
    });
    this.addHook('beforeUpdate', async user => {
      if (user.password) {
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(user.password, salt);
      }
    });
    return this;
  }
}

module.exports = Users;
