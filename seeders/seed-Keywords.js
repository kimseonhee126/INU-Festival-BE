'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Keywords AUTO_INCREMENT = 1;');
    await queryInterface.bulkInsert(
      'Keywords',
      [
        {
          id: 1,
          word: '재미져1',
        },
        {
          id: 2,
          word: '재미져2',
        },
        {
          id: 3,
          word: '재미져3',
        },
        {
          id: 4,
          word: '재미져4',
        },
        {
          id: 5,
          word: '재미져5',
        },
        {
          id: 6,
          word: '재미져6',
        },
        {
          id: 7,
          word: '재미져7',
        },
        {
          id: 8,
          word: '재미져8',
        },
        {
          id: 9,
          word: '재미져9',
        },
        {
          id: 10,
          word: '재미져10',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Keywords', null, {});
  }
};
