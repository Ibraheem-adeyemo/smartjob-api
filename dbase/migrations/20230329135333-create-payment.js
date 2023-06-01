'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reference: {
        type: Sequelize.STRING
      },
      amountPaid: {
        type: Sequelize.FLOAT
      },
      paidBy: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName:'Users'
            },
            key:'id'
        }
      },
      paidFor: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName:'Services'
            },
            key:'id'
        }
      },
      paidTo: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName:'Users'
            },
            key:'id'
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
    await queryInterface.dropTable('payments');
  }
};