'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE OneLines AUTO_INCREMENT = 1;');
    const users = await queryInterface.sequelize.query(`SELECT id from Users;`);
    // console.log(users)
    const userRows = users[0];

    await queryInterface.bulkInsert(
      'OneLines',
      [
        {
          id:1,
          content: '학교에 싸이 불러주세요',
          emoji: "happy.png",
          userId: userRows[0].id,
        },
        {
          id:2,
          content: '수업 일찍 끝내저...',
          emoji: "sad.png",
          userId: userRows[1].id,
        },
        {
          id:3,
          content: '흐아아아암...',
          emoji: "confuse.png",
          userId: userRows[2].id,
        },
        {
          id:4,
          content: '학교에 자이언티 불러주세요',
          emoji: "happy.png",
          userId: userRows[3].id,
        },
        {
          id:5,
          content: '시스템보안과해킹 멈춰...',
          emoji: "sad.png",
          userId: userRows[4].id,
        },
        {
          id:6,
          content: '세상이 나에게 너무 많은걸 바래...',
          emoji: "sad.png",
          userId: userRows[5].id,
        },
        {
          id:7,
          content: '모바일소프트웨어 공강 너무 조하',
          emoji: "happy.png",
          userId: userRows[6].id,
        },
        {
          id:8,
          content: '프론트 화이팅 ㅎㅎ',
          emoji: "happy.png",
          userId: userRows[7].id,
        },
        {
          id:9,
          content: 'ㅎㅅㅎ',
          emoji: "confuse.png",
          userId: userRows[8].id,
        },
        {
          id:10,
          content: ':)',
          emoji: "sad.png",
          userId: userRows[0].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OneLines', null, {});
  }
};
