'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Performs',
      [
        {
          id: 1,
          name: '포크라인',
          date: '2023-10-06',
          day: '금요일',
          time: '18:30',
          category: '동아리',
          img: 'temp.img',
        },
        {
          id: 2,
          name: '울림',
          date: '2023-10-06',
          day: '금요일',
          time: '19:00',
          category: '동아리',
          img: 'temp.img',
        },
        {
          id: 3,
          name: '커플리온스',
          date: '2023-10-06',
          day: '금요일',
          time: '19:30',
          category: '동아리',
          img: 'temp.img',
        },
        {
          id: 4,
          name: '인스디스',
          date: '2023-10-06',
          day: '금요일',
          time: '20:00',
          category: '동아리',
          img: 'temp.img',
        },
        {
          id: 5,
          name: '데이먼스 이어',
          date: '2023-10-06',
          day: '금요일',
          time: '21:00',
          category: '연예인',
          img: 'temp.img',
        },
        {
          id: 6,
          name: '볼빨간 사춘기',
          date: '2023-10-06',
          day: '금요일',
          time: '21:30',
          category: '연예인',
          img: 'temp.img',
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Performs', null, {});
  },
};
