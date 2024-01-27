'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rank: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      nick: {
        type: Sequelize.STRING(15),
      },
      snsId: {
        type: Sequelize.STRING(30),
      },
      provider: {
        type: Sequelize.STRING(10),
      },
      studentId: {
        type: Sequelize.STRING(20),
      },
      barcode: {
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('Users');
  }
};