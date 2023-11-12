'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // booth - boothDays FK 설정
    await queryInterface.addConstraint('BoothDays', {
      fields: ['boothId'],
      type: 'foreign key',
      name: 'boothIdFk',
      references: {
        table: 'Booths',
        field: 'id',
      },
    });

    // OneLines 테이블에 studentID 컬럼 추가하기
    await queryInterface.addColumn("OneLines", "studentID", {
        type: Sequelize.INTEGER,
    });
    // User - OneLine FK 설정
    await queryInterface.addConstraint('OneLines', {
      fields: ['studentID'],
      type: 'foreign key',
      name: 'studentIDFK',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('BoothDays', 'boothIdFk');
    await queryInterface.removeConstraint('OneLines', 'studentIDFK');
  }
};