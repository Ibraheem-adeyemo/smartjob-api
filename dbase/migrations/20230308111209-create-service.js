'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      advancePayment: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      workId: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName:'Works'
            },
            key: 'id'
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'Addresses'
            },
            key:'id'
        }
      },
      expertLevel: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['beginner', 'intermediate', 'advance', 'expert']
      },
      yearsOfExperience: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      banners: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      video: {
        allowNull: true,
        type: Sequelize.STRING
      },
      // you may need to change the service type to array 
    //   or you may need to incled all
      serviceType: {
        type:Sequelize.INTEGER,
        // values: ['all','hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
      },
      status: {
        type:Sequelize.ENUM,
        values: ['available','notavailable']
      },
    //   service charge will be removed and the buyers will request for quotation
    // ======Service charge is removed because there is table for charges where a user can have multiple charges for a service======
      serviceCharges: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'Charges'
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
    await queryInterface.dropTable('Services');
  }
};