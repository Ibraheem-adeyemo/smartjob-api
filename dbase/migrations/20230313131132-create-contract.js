'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentPhase: {
        type: Sequelize.STRING,
        allowNull:false
      },
      amountAlreadyPaid: {
        type: Sequelize.STRING        
      },
      remainingBalance: {
        type: Sequelize.STRING
      },
      toBeCompletedOn: {
        type: Sequelize.DATE,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['active', 'completed', 'cancelled'],
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
    await queryInterface.dropTable('contracts');
  }
};