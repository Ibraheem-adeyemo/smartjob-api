'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING,
        allowNull:false
      },
      state: {
        type: Sequelize.STRING,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      subUrb: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      houseNumber: {
        type: Sequelize.STRING
      },
      location: {
        type:Sequelize.GEOMETRY('POINT', 4326),
        allowNull:false
    },
    location_m: {
        type:Sequelize.GEOMETRY('POINT', 3857),
        allowNull:false
    },
    coordinate: {
        type:Sequelize.STRING,
        allowNull:false
    },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      latitude: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('Addresses');
  }
};