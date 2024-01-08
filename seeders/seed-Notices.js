'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 
    const users = await queryInterface.sequelize.query(`SELECT id from Users;`);
    const userRows = users[0];
    console.log(userRows);

    await queryInterface.bulkInsert(
      'notices',
      [
        {
          "title": "알콜존 안내",
          "category": "공지",
          "content": "알콜존 안내입니다~ 위치는~ 시간은...",
          "img": "temp.img",
        },
        {
          "title": "셔틀버스 안내",
          "category": "공지",
          "content": "셔틀버스 안내입니다~ 위치는~ 시간은...",
          "img": "temp.img",
        },
        {
          "title": "푸드존 안내",
          "category": "공지",
          "content": "푸드존 안내입니다~ 위치는~ 시간은...",
          "img": "temp.img",
        },
        {
          "title": "경품추첨 안내",
          "category": "이벤트",
          "content": "경품추첨 안내입니다~ 위치는~ 시간은...",
          "img": "temp.img",
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OneLines', null, {});
  }
};
