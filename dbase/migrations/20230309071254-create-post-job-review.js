'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      experience: {
        type: Sequelize.ENUM(['good','bad','satisfactory','excellent','very worst','extremely worst', 'very satisfactory'])
      },
      unprovidedInfo: {
        type: Sequelize.TEXT
      },
      futureEngagement: {
        type: Sequelize.ENUM(['very likely', 'likely', 'not likely', 'very unlikely'])
      },
      reccomendation: {
        type: Sequelize.ENUM(['reccomended', 'notreccomended'])
      },
      comment: {
        type: Sequelize.TEXT
      },
      ratings: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Reviews');
  }
};