'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kycs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NINNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type:Sequelize.INTEGER,
        references: {
            model: {
                tableName:'Users'
            },
            key:'id'
        }
      },
      isKycVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      votersCard: {
        type: Sequelize.STRING
      },
      utilityBill: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('kycs');
  }
};