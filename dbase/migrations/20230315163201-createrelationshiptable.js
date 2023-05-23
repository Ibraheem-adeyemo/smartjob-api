'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(transaction => {
        return Promise.all([
            queryInterface.createTable('job_categories', {
                jobId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'jobs'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
                categoryId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'categories'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
            },{transaction}),
        ])
    })  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
