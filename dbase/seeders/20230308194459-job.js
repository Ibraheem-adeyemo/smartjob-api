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
    // */
    // await queryInterface.bulkInsert('Jobs', [{
    //     title:'Casual job to pack load',
    //     description: 'Casual job to pack some load from one building to another building. The load is much and may take 3 hefty men 4 days to pack everything',
    //     location:'Okeresi in Ede south',
    //     expertLeve:'any',
    //     images:'images.jpg',
    //     video:'',
    //     contractType:'daily',
    //     status:'new',
    //     numberOfWorkers:5,
    //     budget:50000, 
    //     budgetFor:'job',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:5,
    //   },
    //   {
    //     title:'Casual job to clear bush',
    //     description: 'Casual job to clear bush for farm land. the land size is about 15 acres',
    //     location:'Ikpeasu Edo north',
    //     expertLeve:'any',
    //     images:'images.jpg',
    //     video:'',
    //     contractType:'daily',
    //     status:'new',
    //     numberOfWorkers:3,
    //     budget:2000, 
    //     budgetFor:'worker',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:1,
    //   },
    //   {
    //     title:'Skilled electrician',
    //     description: 'Skilled electrician to do the complete electrical work of a three bedroom flat',
    //     location:'Gombe street yewa south',
    //     expertLeve:'expert',
    //     images:'building.jpg',
    //     video:'',
    //     contractType:'contract',
    //     status:'new',
    //     numberOfWorkers:1,
    //     budget:200000, 
    //     budgetFor:'job',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:2,
    //     // addressId:4
    //   },
    //   {
    //     title:'Photographer',
    //     description: 'Skilled Photographer to do the complete coverage work of a any event',
    //     location:'Gombe street yewa south',
    //     expertLeve:'expert',
    //     images:'building.jpg',
    //     video:'',
    //     contractType:'contract',
    //     status:'new',
    //     numberOfWorkers:1,
    //     budget:200000, 
    //     budgetFor:'job',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:4,
    //     // addressId:1
    //   },
    //   {
    //     title:'Catering',
    //     description: 'Experienced caterer that deliver a topnotch cooking experience am certified caterer check my profile',
    //     location:'Olorunsogo ibadan',
    //     expertLeve:'expert',
    //     images:'building.jpg',
    //     video:'',
    //     contractType:'contract',
    //     status:'new',
    //     numberOfWorkers:1,
    //     budget:200000, 
    //     budgetFor:'job',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userId:3,
    //     // addressId:2
    //   }
    // ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Jobs', null, {})
  }
};
