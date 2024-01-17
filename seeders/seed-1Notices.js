'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Notices AUTO_INCREMENT = 1;');
    await queryInterface.bulkInsert(
      'Notices',
      [
        {
          "title": "알콜존 안내",
          "category": "공지사항",
          "content": "알콜존 안내입니다~ 위치는~ 시간은...",
        },
        {
          "title": "셔틀버스 안내",
          "category": "공지사항",
          "content": "셔틀버스 안내입니다~ 위치는~ 시간은...",
        },
        {
          "title": "푸드존 안내",
          "category": "공지사항",
          "content": "푸드존 안내입니다~ 위치는~ 시간은...",
        },
        {
          "title": "경품추첨 안내",
          "category": "이벤트",
          "content": "경품추첨 안내입니다~ 위치는~ 시간은...",
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }
};
