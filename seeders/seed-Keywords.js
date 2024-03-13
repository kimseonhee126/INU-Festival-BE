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
          word: '아이브',
        },
        {
          id: 2,
          word: '주점',
        },
        {
          id: 3,
          word: '족발',
        },
        {
          id: 4,
          word: '전',
        },
        {
          id: 5,
          word: '앙꼬치',
        },
        {
          id: 6,
          word: '맛집',
        },
        {
          id: 7,
          word: '술',
        },
        {
          id: 8,
          word: '공연',
        },
        {
          id: 9,
          word: '연예인',
        },
        {
          id: 10,
          word: '라인업',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Keywords', null, {});
  }
};
