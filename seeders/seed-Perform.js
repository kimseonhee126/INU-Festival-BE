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
          detail: '안녕하세요! 인천대 대표 어쿠스틱 동아리 포크라인입니다! 가을 축제의 분위기에 맞게 어쿠스틱의 느낌이 물씬 풍기는 곡들로 공연을 구성해보았데요, 서늘해진 날씨지만 여러분의 마음을 따뜻하게 해드릴 노래들 들려드리도록 하겠습니다',
          img: 'temp.img',
        },
        {
          id: 2,
          name: '울림',
          date: '2023-10-06',
          day: '금요일',
          time: '19:00',
          category: '동아리',
          detail: '유구한 전통의 동아리, 우리 문화를 사랑하는, 풍물패 울림입니다~ ',
          img: 'temp.img',
        },
        {
          id: 3,
          name: '커플리온스',
          date: '2023-10-06',
          day: '금요일',
          time: '19:30',
          category: '동아리',
          detail: '인천을 수호하는 두마리 사자 커플리온스',
          img: 'temp.img',
        },
        {
          id: 4,
          name: '인스디스',
          date: '2023-10-06',
          day: '금요일',
          time: '20:00',
          category: '동아리',
          detail: '중앙흑인음악동아리 인스디스. 힙합과 알앤비 음악을 작곡하고 공연하고 있습니다.',
          img: 'temp.img',
        },
        {
          id: 5,
          name: '데이먼스 이어',
          date: '2023-10-06',
          day: '금요일',
          time: '21:00',
          category: '연예인',
          detail: '...',
          img: 'temp.img',
        },
        {
          id: 6,
          name: '볼빨간 사춘기',
          date: '2023-10-06',
          day: '금요일',
          time: '21:30',
          category: '연예인',
          detail: '...',
          img: 'temp.img',
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Performs', null, {});
  },
};
