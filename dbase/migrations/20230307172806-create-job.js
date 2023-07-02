'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
    /**
     * jobType: {
     *  allowNull:false,
     * type: Sequel.ENUM,
     * values: ['casual', 'skilled', 'professional']
     * }
     * 
     * */   
    longitude: {
        type: Sequelize.FLOAT,
        allowNull:true
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull:true
      },
      expertLeve: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['any', 'beginner', 'intermediate', 'advance', 'expert']
      },
      images: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      video: {
        allowNull: true,
        type: Sequelize.STRING
      },
      contractType: {
        type:Sequelize.ENUM,
        values: ['hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
      },
      status: {
        type:Sequelize.ENUM,
        values: ['new','engaged','completed','settled', 'expired']
      },
      numberOfWorkers: {
        type:Sequelize.INTEGER
      },
      budget: {
        // change this to range(min, max)
        type: Sequelize.INTEGER
      },
      budgetFor: {
        type: Sequelize.ENUM,
        values: ['worker', 'job']
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
    await queryInterface.dropTable('Jobs');
  }
};