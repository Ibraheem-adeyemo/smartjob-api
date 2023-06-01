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
            // queryInterface.changeColumn('Users', 'phoneNumber', {
            //     type: 'VARCHAR(22)',
            //     allowNull:false
            // },{transaction}),
            // queryInterface.addColumn('Contracts', 'status', {
            //     type: Sequelize.DataTypes.ENUM,
            //     values: ['active', 'completed', 'cancelled'],
            //     allowNull: false
            // },{transaction}),
            queryInterface.addColumn('Addresses', 'userId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model:{
                        tableName: 'Users',
                        // schema: 'schema'
                    },
                    key:'id'
                },
                allowNull:false
            },{transaction}),
            queryInterface.addColumn('Addresses', 'serviceId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'Services',
                        // schema: 'schema'
                    },
                    key:'id'
                }
            },{transaction}),
            queryInterface.addColumn('Addresses', 'jobId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Jobs',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:true
            },{transaction}),
            queryInterface.addColumn('Jobs', 'userId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Users',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:false
            },{transaction}),
            queryInterface.createTable('job_categories', {
                jobId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Jobs'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
                categoryId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Categories'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
            },{transaction}),
            queryInterface.createTable('job_tags', {
                jobId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Jobs'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
                tagId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'tags'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
            },{transaction}),          
           
            queryInterface.addColumn('Jobs', 'addressId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Addresses',
                        // schema: 'schema'addresses
                    },
                    key: 'id'
                },
                allowNull:true
            },{transaction}),
            queryInterface.addColumn('Reviews', 'jobId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Jobs',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:false
            },{transaction}),
            queryInterface.createTable('service_categories', {
                serviceId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Services'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
                categoryId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Categories'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
            },{transaction}),   
            queryInterface.createTable('contract_user', {
                contractId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'contracts'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
                userId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Users'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
            },{transaction}),
            
            queryInterface.addColumn('contracts', 'jobId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Jobs',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:true
            },{transaction}),
            queryInterface.addColumn('Services', 'userId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Users',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:true
            },{transaction}),
            queryInterface.addColumn('quotations', 'jobId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Jobs',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:true
            },{transaction}),
            queryInterface.addColumn('service-histories', 'serviceId', {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName:'Services',
                        // schema: 'schema'
                    },
                    key: 'id'
                },
                allowNull:true
            },{transaction}),
            queryInterface.createTable('service_tags', {
                serviceId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'Services'
                        },
                        key:'id'
                    },
                    allowNull:false
                },
                tagId: {
                    type:Sequelize.DataTypes.INTEGER,
                    references: {
                        model: {
                            tableName:'tags'
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
