'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    //   title is removed because of the work id being specified
    //   title: {
    //     allowNull: true,
    //     type: Sequelize.STRING
    //   },
      workId: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName:'works'
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
                tableName: 'addresses'
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
                tableName: 'charges'
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
    await queryInterface.dropTable('services');
  }
};