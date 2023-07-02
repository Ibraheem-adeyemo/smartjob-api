'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      meantFor: {
        type: Sequelize.CHAR,
        allowNull:false
      },
      meantForId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      notificationType: {
        type: Sequelize.CHAR,
        allowNull:false
    },
      from: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};