'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const serviceTypes =  ['hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'contract', 'fulltime']
    await queryInterface.bulkInsert('servicetypes', [...serviceTypes.map(sevType => ({typeOfService:sevType, createdAt: new Date(),updatedAt: new Date()}))])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('tags', null, {})
  }
};
