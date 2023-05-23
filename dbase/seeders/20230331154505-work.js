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
   const works = [{name:'Electrical', code:'elec'},{name:'Plumbing', code:'plum'},{name:'Cleaning', code:'clen'},{name:'Clearing',code:'cler'},{name:'Mechanical',code:'mech'},{name:'Packing',code:'pack'}, {name:'Moving',code:'move'},{name:'Logistic',code:'logs'}, {name:'Carpentary',code:'carp'},{name:'Painting',code:'pait'},{name:'Aluminium', code:'alum'},{name:'Laundry', code:'laun'},{name:'Gen repair', code:'gerp'},{name:'Towing Vehicle', code:'towv'},{name:'bricklaying',code:'brcl'},{name:'weldering',code:'wedr'},{name:'locksmith',code:'lcsm'},{name:'goldsmith',code:'gost'},{name:'nanny',code:'nany'},{name:'Security',code:'secu'},{name:'Errand',code:'erad'},{name:'Casual',code:'casu'},{name:'Teaching',code:'teac'},{name:'Driver',code:'driv'},{name:'Cobbler',code:'cobb'},{name:'Gardner',code:'gard'},{name:'Tailoring', code:'tail'}, {name:'Tiling',code:'tile'}, {name:'Supervision', code:'supv'}]
    await queryInterface.bulkInsert('Works', [...works.map(work => {
        return {
            name: work.name,
            code:work.code,
            createdAt: new Date(),
            updatedAt: new Date()
          }
    })], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
