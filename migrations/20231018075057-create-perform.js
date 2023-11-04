'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('Performs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(20)
      },
      date: {
        type: Sequelize.STRING(10)
      },
      day: {
        type: Sequelize.STRING(5)
      },
      time: {
        type: Sequelize.STRING(10)
      },
      category: {
        type: Sequelize.STRING(10)
      },
      detail: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Performs');
  }
};