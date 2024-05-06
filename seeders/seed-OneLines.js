'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE OneLines AUTO_INCREMENT = 1;');
    const users = await queryInterface.sequelize.query(`SELECT id from Users;`);
    const userRows = users[0];

    await queryInterface.bulkInsert(
      'OneLines',
      [
        {
          content: '축제는 다양한 공연과 이벤트가.',
          emoji: "happy",
          userId: userRows[0].id,
        },
        {
          content: '축제의 분위기는 너무 흥미로워요.',
          emoji: "happy",
          userId: userRows[1].id,
        },
        {
          content: '축제에 참여하면 색다른 경험을.',
          emoji: "excited",
          userId: userRows[2].id,
        },
        {
          content: '이번 축제는 예상보다 흥미로웠어요.',
          emoji: "funny",
          userId: userRows[3].id,
        },
        {
          content: '축제에서 새로운 사람들을 만나요.',
          emoji: "excited",
          userId: userRows[4].id,
        },
        {
          content: '축제의 다채로운 프로그램이.',
          emoji: "happy",
          userId: userRows[4].id,
        },
        {
          content: '축제에는 많은 사람들이 모여요.',
          emoji: "funny",
          userId: userRows[3].id,
        },
        {
          content: '축제에서 즐길 거리가 많아요.',
          emoji: "excited",
          userId: userRows[2].id,
        },
        {
          content: '축제에서 다양한 음식을 즐겨요.',
          emoji: "happy",
          userId: userRows[1].id,
        },
        {
          content: '축제에서 새로운 취미를 발견해요.',
          emoji: "thrilling",
          userId: userRows[0].id,
        },
        {
          content: '축제의 다양한 푸드트럭이 좋아요.',
          emoji: "excited",
          userId: userRows[0].id,
        },
        {
          content: '축제의 분위기가 너무 흥미로워요.',
          emoji: "thrilling",
          userId: userRows[0].id,
        },
        {
          content: '축제의 다채로운 문화행사가.',
          emoji: "thrilling",
          userId: userRows[3].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OneLines', null, {});
  }
};