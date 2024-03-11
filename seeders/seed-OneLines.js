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
          content: '오늘도 축제 화이팅!!',
          emoji: "happy",
          userId: userRows[0].id,
        },
        {
          content: '최근에 본 좋은 영화 있나여?',
          emoji: "happy",
          userId: userRows[1].id,
        },
        {
          content: '이런 정보를 공유해주셔서 감사합니다!',
          emoji: "excited",
          userId: userRows[2].id,
        },
        {
          content: '종강내놔...ㅡ.ㅡ',
          emoji: "funny",
          userId: userRows[3].id,
        },
        {
          content: '축제 즐길 거리가 별로 없네 ㅜㅜ',
          emoji: "excited",
          userId: userRows[4].id,
        },
        {
          content: '퇴근길에 보니 기분이 좋네요',
          emoji: "happy",
          userId: userRows[5].id,
        },
        {
          content: '피곤 그 자체',
          emoji: "funny",
          userId: userRows[6].id,
        },
        {
          content: '인천대 축제가 이렇게 재밌었나?!',
          emoji: "excited",
          userId: userRows[7].id,
        },
        {
          content: '번개할 사람 구해요!',
          emoji: "happy",
          userId: userRows[8].id,
        },
        {
          content: '푸드트럭 대박임~',
          emoji: "thrilling",
          userId: userRows[0].id,
        },
        {
          content: '축제 같이 보실 분~~',
          emoji: "excited",
          userId: userRows[0].id,
        },
        {
          content: '오 이 기능 뭐냐?',
          emoji: "thrilling",
          userId: userRows[0].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OneLines', null, {});
  }
};
