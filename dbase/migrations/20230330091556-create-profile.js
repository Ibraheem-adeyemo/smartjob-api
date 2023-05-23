'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type:Sequelize.INTEGER,
        references: {
            model: {
                tableName:'Users'
            },
            key: 'id'
        }
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      userImage: {
        type:Sequelize.STRING,
        allowNull:true
      },
      isAccountVerified: {
        type:Sequelize.BOOLEAN,
        defaultValue: false
        },
    isPhoneNumberVerified:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
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
    await queryInterface.dropTable('profiles');
  }
};