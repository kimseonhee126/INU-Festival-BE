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
    // User - OneLine FK 설정
    await queryInterface.addConstraint('OneLines', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userIdFK',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
    // Notice - NoticeImg FK 설정
    await queryInterface.addConstraint('NoticeImgs', {
      fields: ['noticeId'],
      type: 'foreign key',
      name: 'noticeIdFK',
      references: {
        table: 'Notices',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Comments', {
      fields: ['boothId'],
      type: 'foreign key',
      name: 'boothIdFk2',
      references: {
        table: 'Booths',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userIdFk2',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('BoothDays', 'boothIdFk');
    await queryInterface.removeConstraint('OneLines', 'snsIdFK');
    await queryInterface.removeConstraint('NoticeImgs', 'noticeIdFK');
    await queryInterface.removeConstraint('Comments', 'boothIdFk2');
    await queryInterface.removeConstraint('Comments', 'userIdFk2');
  }
};