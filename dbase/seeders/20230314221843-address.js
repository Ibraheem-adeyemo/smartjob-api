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

    await queryInterface.bulkInsert('Addresses', [{
        country:'Nigeria',
        state:'Osun',
        city:'iwo',
        subUrb:'Okeresi',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.182917 7.63333)',4326),//{type:'Point', coordinates:['4.182917','7.63333']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.182917 7.63333)',3857),
        coordinate:'4.182917 7.63333',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId:11,
        longitude:4.18292,
        latitude:7.63333,
        userId:8
      },
      {
         country:'Nigeria',
         state:'Osun',
         city:'ode-omu',
         subUrb:'alusekere',
         street:'',
         houseNumber:'',
         location: Sequelize.fn('ST_GeomFromText', 'POINT(4.40024 7.53345)',4326),//{type:'Point', coordinates:['4.40024','7.53345']},
         location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.40024 7.53345)',3857),
         coordinate:'4.40024 7.53345',
         createdAt: new Date(),
         updatedAt: new Date(),
         userId:5,
         longitude:12.00987,
        latitude:0.00987,
       },
       {
         country:'Nigeria',
         state:'Osun',
         city:'Ede',
         subUrb:'Okeresi',
         street:'',
         houseNumber:'',
         location: Sequelize.fn('ST_GeomFromText', 'POINT(4.43316 7.73277)',4326),//{type:'Point', coordinates:['4.43316','7.73277']},
         location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.43316 7.73277)',3857),
         coordinate:'4.43316 7.73277',
         createdAt: new Date(),
         updatedAt: new Date(),
         userId:9,
         longitude:12.00987,
        latitude:0.00987,
       },
       {
        country:'Nigeria',
        state:'Osun',
        city:'akoda',
        subUrb:'ileoba',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.44989 7.61623)',4326),//{type:'Point', coordinates:['4.44989','7.61623']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.44989 7.61623)',3857),
        coordinate:'4.44989 7.61623',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId:2,
        longitude:12.00987,
        latitude:0.00987,
      },
      {
        country:'Nigeria',
        state:'Osun',
        city:'ife',
        subUrb:'OAUTH',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.51634 7.52024)',4326),//{type:'Point', coordinates:['4.51634','7.52024']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.51634 7.52024)',3857),
        coordinate:'4.51634 7.52024',
        createdAt: new Date(),
        updatedAt: new Date(),
        longitude:12.00987,
        latitude:0.00987,
        userId:7
      },
      {
        country:'Nigeria',
        state:'Osun',
        city:'abere',
        subUrb:'GRA',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.51993 7.73964)',4326),//{type:'Point', coordinates:['4.51993','7.73964']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.51993 7.73964)',3857),
        coordinate:'4.51993 7.73964',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId:3,
        longitude:12.00987,
        latitude:7.73964,
      },
      {
        country:'Nigeria',
        state:'Osun',
        city:'ife',
        subUrb:'campus gate',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.52335 7.52036)',4326),//{type:'Point', coordinates:['4.52335','7.52036']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.52335 7.52036)',3857),
        coordinate:'4.52335 7.52036',
        createdAt: new Date(),
        updatedAt: new Date(),
        longitude:12.00987,
        latitude:7.52036,
        userId:6
      },
      {
        country:'Nigeria',
        state:'Osun',
        city:'osogbo',
        subUrb:'oke-bale',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.55367 7.77835)',4326),//{type:'Point', coordinates:['4.55367','7.77835']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.55367 7.77835)',3857),
        coordinate:'4.55367 7.77835',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId:4,
        longitude:12.00987,
        latitude:7.77835,
      },
      {
        country:'Nigeria',
        state:'Osun',
        city:'ilesha',
        subUrb:'government college',
        street:'',
        houseNumber:'',
        location: Sequelize.fn('ST_GeomFromText', 'POINT(4.55367 7.77835)',4326),//{type:'Point', coordinates:['4.55367','7.77835']},
        location_m: Sequelize.fn('ST_GeomFromText', 'POINT(4.55367 7.77835)',3857),
        coordinate:'4.55367 7.77835',
        createdAt: new Date(),
        updatedAt: new Date(),
        longitude:4.55367,
        latitude:7.77835,
        userId:10
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
    return queryInterface.bulkDelete('Addresses', null, {})
  }
};
