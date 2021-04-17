'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('donate_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      id_package: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      itemname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eff1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      effv1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eff2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      effv2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eff3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      effv3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('donate_items');
  }
};
