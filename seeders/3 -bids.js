"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("bids", [
      {
        email: "a@a.com",
        amount: 100,
        artworkId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "b@b.com",
        amount: 200,
        artworkId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "c@c.com",
        amount: 300,
        artworkId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "d@d.com",
        amount: 400,
        artworkId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "e@e.com",
        amount: 500,
        artworkId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "f@f.com",
        amount: 600,
        artworkId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "g@g.com",
        amount: 700,
        artworkId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
