'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amountDeposited: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      hourDepositedFor: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM,
        values:['started','done','settled','canceled','pending'],
        defaultValue:'pending'
      },
      bookedBy: {
        type: Sequelize.INTEGER,
        references: {
            model:{
                tableName:'Users'
            },
            key:'id'
        }
      },
      bookedFor: {
        type: Sequelize.INTEGER,
        references: {
            model:{
                tableName:'Services'
            }
        }
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
    await queryInterface.dropTable('bookings');
  }
};