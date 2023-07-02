'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',title
     *   isBetaMember: false
     * }], {});
    // */
    await queryInterface.bulkInsert('Services', [{
    //     // title:'Casual job',
    //     workId: 22,
    //     description: 'I provide a professional casual job. I carryout my service by ensure safety of your property, my safety as well as the other stakeholder, and in such away that ensure transparency without giving room for over charges or under charges. you will be glad that you employ me.',
    //     location:'Okeresi in Ede south',
    //     expertLevel:'expert',
    //     banners:'images.jpg',
    //     video:'',
    //     yearsOfExperience:13,
    //     serviceType:'hourly',
    //     status:'available',
    //     servicecharge:700,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:3,
    //     // addressId:2
    //   },
    //   {
    //     // title:'Carpentary job',
    //     workId: 9,
    //     description: 'I provide a professional Carpentary job. I carryout my service by ensure safety of your property, mine as well as the other stakeholder, and in such away that ensure transparency without giving room for over charges or under charges. you will be glad that you employ me.',
    //     location:'jolade street in ojota',
    //     expertLevel:'expert',
    //     banners:'images.jpg',
    //     video:'',
    //     yearsOfExperience:15,
    //     // you may need to change the service type to array
    //     serviceType:'weekly',
    //     status:'available',
    //     servicecharge:70000,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:5,
    //     // addressId:1
    //   },
    //   {
    //     // title:'Supervising job',
    //     workId: 30,
    //     description: 'I provide a professional Supervising job. I carryout my service by ensure safety of your property, mine as well as the other stakeholder, and in such away that ensure transparency without giving room for over charges or under charges. you will be glad that you employ me.',
    //     location:'grogory street in Idumota',
    //     expertLevel:'expert',
    //     banners:'images.jpg',
    //     video:'',
    //     yearsOfExperience:8,
    //     // you may need to change the service type to array
    //     serviceType:'daily',
    //     status:'available',
    //     servicecharge:4000,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:4,
    //     // addressId:5
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Services', null, {});
  }
};
