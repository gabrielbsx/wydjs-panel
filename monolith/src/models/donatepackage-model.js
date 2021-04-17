'use strict';
const { Model, DataTypes } = require('sequelize');

class DonatePackage extends Model {
  static init(sequelize) {
    super.init({
        name: DataTypes.STRING(100),
        percent: DataTypes.INTEGER.UNSIGNED,
        value: DataTypes.INTEGER.UNSIGNED,
        donate: DataTypes.INTEGER.UNSIGNED,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'donate_package'
    });
    return this;
  }

  static associate(models) {
    //this.belongsToMany(model.User, { foreignKey: 'id_user', as: 'owner' })
  }
}
  
module.exports = DonatePackage;