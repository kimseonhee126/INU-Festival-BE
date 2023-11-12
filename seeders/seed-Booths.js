'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Booths',
      [
        {
          id: 1,
          name: '총학부스',
          category: '비주점',
          department: '총학생회',
          description: '총학생회 부스입니다.',
          liked: 0,
          img: 'temp.img',
        },
        {
          id: 2,
          name: '다크2호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 555,
          img: 'temp.img',
        },
        {
          id: 3,
          name: '다크3호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 354,
          img: 'temp.img',
        },
        {
          id: 4,
          name: '다크4호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 777,
          img: 'temp.img',
        },
        {
          id: 5,
          name: '다크5호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 2500,
          img: 'temp.img',
        },
        {
          id: 6,
          name: '다크ege호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 2000,
          img: 'temp.img',
        },
        {
          name: '다크iuit호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 25345,
          img: 'temp.img',
        },
        {
          name: '다크uuuu호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 3543,
          img: 'temp.img',
        },
        {
          name: '다크yyyy호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 2345,
          img: 'temp.img',
        },
        {
          name: '다크asdfsd호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 452,
          img: 'temp.img',
        },
        {
          name: '다크sagdfssa호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 1000,
          img: 'temp.img',
        },
        {
          name: '다크afsd호스',
          category: '비주점',
          department: '탁구부',
          description: '탁구 부스입니다.',
          liked: 1000,
          img: 'temp.img',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};
