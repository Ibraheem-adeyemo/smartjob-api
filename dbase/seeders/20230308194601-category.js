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
//    const categories = ['plumbing','electrical','cleaning','casual','assistance','painting','engineering','cook','attendant','teaching', 'professional', 'skilled', 'shoe making', 'brick laying','architecture','funiture','carpentring']
//     await queryInterface.bulkInsert('Categories', [...categories.map(cat => ({name:cat, createdAt: new Date(),updatedAt: new Date()}))])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
