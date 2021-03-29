'use strict';
const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init({
        username: DataTypes.STRING(12),
        password: DataTypes.STRING(60),
        email: DataTypes.STRING(100),
        name: DataTypes.STRING(50),
        created_at: DataTypes.DATE,
        updated_at: DateTypes.DATE,
    }, {
      sequelize,
      modelName: 'users'
    });
    this.addHook('beforeCreate', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
    this.addHook('beforeUpdate', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
}
  
module.exports = Users;