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
    await queryInterface.bulkInsert('Users', [
        {
           id:1, 
           firstName: 'John',
           lastName: 'Doe',
           email:'alt.yq-2o6e9fk@yopmail.com',
           phoneNumber:'08140404040',
           password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
           isVerified: true,
           credibility:'active',
           phoneNumber:'+2347035853137',
           createdAt: new Date(),
           updatedAt: new Date()
         },
         {
            id:2,
            firstName: 'Smith',
            lastName: 'Doe',
            email:'bufurulasu-2080@yopmail.com',
            password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
            isVerified: true,
            username:'Easy job',
            credibility:'active',
            phoneNumber:'+2348140404040',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:3,
            firstName: 'Abdullah',
            lastName: 'Isma\'el',
            email:'koisaffoxaulau-5776@yopmail.com',
            phoneNumber:'+2348140404040',
            isVerified: false,
            credibility:'active',
            password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:4,
            firstName: 'james',
            lastName: 'Isma\'el',
            email:'koisaffoxaulau-57761@yopmail.com',
            phoneNumber:'+2348140404040',
            password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
            isVerified: false,
            credibility:'active',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:5,
            firstName: 'Abdullah',
            lastName: 'senior',
            email:'koisaffoxaulau-57762@yopmail.com',
            phoneNumber:'+2348140404040',
            password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
            isVerified: true,
            credibility:'active',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:6, 
            firstName: 'John',
            lastName: 'Doe',
            email:'alt.yq-2o6e9fk21@yopmail.com',
            phoneNumber:'+2348140404040',
            password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
            isVerified: true,
            credibility:'active',
            phoneNumber:'+2347035853137',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
             id:7,
             firstName: 'Smith',
             lastName: 'Doe',
             email:'bufurulasu-20801@yopmail.com',
             password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
             isVerified: true,
             username:'Easy job2',
             credibility:'active',
             phoneNumber:'+2348140404040',
             createdAt: new Date(),
             updatedAt: new Date()
           },
           {
             id:8,
             firstName: 'Abdullah',
             lastName: 'Isma\'el',
             email:'koisaffoxaulau-57763a@yopmail.com',
             phoneNumber:'+2348140404040',
             isVerified: false,
             credibility:'active',
             password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
             createdAt: new Date(),
             updatedAt: new Date()
           },
           {
             id:9,
             firstName: 'james',
             lastName: 'Isma\'el',
             email:'koisaffoxaulau-57763b@yopmail.com',
             phoneNumber:'+2348140404040',
             password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
             isVerified: false,
             credibility:'active',
             createdAt: new Date(),
             updatedAt: new Date()
           },
           {
             id:10,
             firstName: 'Abdullah',
             lastName: 'senior',
             email:'koisaffoxaulau-57763@yopmail.com',
             phoneNumber:'+2348140404040',
             password:'$2b$10$TKCUMYgg1JLjFRopWbeeRuryTt0jsBV1AXKSpOVkFbGbXS/.jrmK6',
             isVerified: true,
             credibility:'active',
             createdAt: new Date(),
             updatedAt: new Date()
           }
        ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
