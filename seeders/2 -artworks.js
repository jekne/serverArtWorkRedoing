"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("artworks", [
      {
        title: "Femme au Béret et à la Robe Quadrillée (Marie-Thérèse Walter)",

        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/5/55/Femme_au_b%C3%A9ret_et_%C3%A0_la_robe_quadrill%C3%A9e_%28Marie-Th%C3%A9r%C3%A8se_Walter%29.jpg",

        hearts: 1,

        minimumBid: 300,
        userId: 1,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Vitruvian Man",

        imageUrl:
          "https://cdn.britannica.com/68/145968-050-01768DAD/Vitruvian-Man-Leonardo-da-Vinci-Gallerie-dellAccademia.jpg",

        hearts: 1,

        minimumBid: 500,
        userId: 1,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Temptation of Saint Anthony ",

        imageUrl:
          "https://emptyeasel.com/wp-content/uploads/2019/03/the-temptation-of-saint-anthony.jpg",

        hearts: 1,

        minimumBid: 800,
        userId: 3,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Still Life – Fast Moving ",

        imageUrl:
          "https://emptyeasel.com/wp-content/uploads/2019/03/still-life-fast-moving.jpg",

        hearts: 1,

        minimumBid: 800,
        userId: 4,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Portrait of Paul Eluard ",

        imageUrl:
          "https://emptyeasel.com/wp-content/uploads/2019/03/portrait-of-paul-eluard.jpg",

        hearts: 1,

        minimumBid: 2000,
        userId: 1,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Starry Night, a famous painting by Vincent Van Gogh ",

        imageUrl:
          "https://www.worldatlas.com/r/w960-q80/upload/1f/e7/fd/1280px-van-gogh-starry-night-google-art-project.jpg",

        hearts: 1,

        minimumBid: 7000,
        userId: 2,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Night Watch was painted by Rembrandt in 1642 ",

        imageUrl:
          "https://www.worldatlas.com/r/w960-q80/upload/45/77/b8/shutterstock-377749780.jpg",

        hearts: 1,

        minimumBid: 3500,
        userId: 3,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     *
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
    await queryInterface.bulkDelete("artworks", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
