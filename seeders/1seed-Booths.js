'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Booths AUTO_INCREMENT = 1;');

    await queryInterface.bulkInsert(
      'Booths',
      [
        {
          name: '총학부스',
          category: '비주점',
          department: '총학생회',
          description: '총학생회 부스입니다.',
          liked: 0,
        },
        {
          name: '다크2호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 555,
        },
        {
          name: '다크3호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 354,
        },
        {
          name: '다크4호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 777,
        },
        {
          name: '다크5호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 2500,
        },
        {
          name: '다크ege호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 2000,
        },
        {
          name: '다크iuit호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 25345,
        },
        {
          name: '다크uuuu호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 3543,
        },
        {
          name: '다크yyyy호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 2345,
        },
        {
          name: '다크asdfsd호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 452,
        },
        {
          name: '다크sagdfssa호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 1000,
        },
        {
          name: '다크afsd호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 1000,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};