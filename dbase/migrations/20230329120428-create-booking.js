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
      advancePayment: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
    //   hourDepositedFor: {
    //     type: Sequelize.FLOAT,
    //     allowNull:false
    //   },
      status: {
        type: Sequelize.ENUM,
        values:['started','done','settled','canceled','in progres','pending','completed','available'],
        defaultValue:'pending'
      },
      isBooked: {
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      time: {
        type: Sequelize.TIME
      },
      recipientName: {
        type: Sequelize.STRING
      },
      recipientPhonenumber: {
        type: Sequelize.STRING
      },
      percentDone: {
        type:Sequelize.INTEGER
      },
      isCompleted: {
        type:Sequelize.BOOLEAN,
        defaultValue: false
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