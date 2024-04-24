'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BoothImgs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
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
      },
      boothId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Booths', // 참조하는 테이블 이름
          key: 'id' // 참조하는 테이블의 컬럼
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BoothImgs');
  }
};