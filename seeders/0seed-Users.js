'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        // id를 1부터 다시 시작하는 로직 추가
        await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;');
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          token: 'temptemp',
          nick: '거북이',
          provider: '카카오',
        },
        {
          id: 2,
          token: 'temptemp',
          nick: '고양이',
          provider: '카카오',
        },
        {
          id: 3,
          token: 'temptemp',
          nick: '물고기',
          provider: '카카오',
        },
        {
          id: 4,
          token: 'temptemp',
          nick: '강아지',
          provider: '카카오',
        },
        {
          id: 5,
          token: 'temptemp',
          nick: '토끼',
          provider: '카카오',
        },
        {
          id: 6,
          token: 'temptemp',
          nick: '너구리',
          provider: '카카오',
        },
        {
          id: 7,
          token: 'temptemp',
          nick: '다람쥐',
          provider: '카카오',
        },
        {
          id: 8,
          token: 'temptemp',
          nick: '여우',
          provider: '카카오',
        },
        {
          id: 9,
          token: 'temptemp',
          nick: '북극곰',
          provider: '카카오',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
