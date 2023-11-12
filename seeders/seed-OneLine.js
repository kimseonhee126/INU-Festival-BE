'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 
    const oneline = await queryInterface.sequelize.query(`SELECT id from Users;`);
    const onelineRows = oneline[0];

    await queryInterface.bulkInsert(
      'OneLines',
      [
        {
          id:1,
          content: '학교에 싸이 불러주세요',
          emoji: "happy.png",
          studentID: onelineRows[0].id
        },
        {
          id:2,
          content: '수업 일찍 끝내저...',
          emoji: "sad.png",
          studentID: onelineRows[1].id
        },
        {
          id:3,
          content: '흐아아아암...',
          emoji: "confuse.png",
          studentID: onelineRows[0].id
        },
        {
          id:4,
          content: '학교에 자이언티 불러주세요',
          emoji: "happy.png",
          studentID: onelineRows[1].id
        },
        {
          id:5,
          content: '시스템보안과해킹 멈춰...',
          emoji: "sad.png",
          studentID: onelineRows[0].id
        },
        {
          id:6,
          content: '세상이 나에게 너무 많은걸 바래...',
          emoji: "sad.png",
          studentID: onelineRows[1].id
        },
        {
          id:7,
          content: '모바일소프트웨어 공강 너무 조하',
          emoji: "happy.png",
          studentID: onelineRows[0].id
        },
        {
          id:8,
          content: '프론트 화이팅 ㅎㅎ',
          emoji: "happy.png",
          studentID: onelineRows[1].id
        },
        {
          id:9,
          content: 'ㅎㅅㅎ',
          emoji: "confuse.png",
          studentID: onelineRows[0].id
        },
        {
          id:10,
          content: ':)',
          emoji: "sad.png",
          studentID: onelineRows[1].id
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OneLines', null, {});
  }
};
