'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Booths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      x: {
        type: Sequelize.STRING
      },
      y: {
        type: Sequelize.STRING
      },
      liked: {
        type: Sequelize.INTEGER
      },
      markerImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('Now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('Now'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Booths');
  }
};