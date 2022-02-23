"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("artworks", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("bids", "artworkId", {
      type: Sequelize.INTEGER,
      references: {
        model: "artworks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("users", "isArtist", {
      type: Sequelize.BOOLEAN,

      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("artworks", "userId");
    await queryInterface.removeColumn("bids", "artworkId");
    await queryInterface.removeColumn("users", "isArtist");
  },

  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
};
