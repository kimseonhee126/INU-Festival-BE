'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE BoothDays AUTO_INCREMENT = 1;');

    const users = await queryInterface.sequelize.query(`SELECT id from Users;`);
    const booths = await queryInterface.sequelize.query(`SELECT id from Booths;`);
    const userRows = users[0];
    const boothRows = booths[0];

    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          content: '좋아요!',
          emoji: 'happy',
          boothId: boothRows[0].id,
          userId: userRows[0].id,
        },
        {
          content: '이 부스는 최고입니다.',
          emoji: 'thrilling',
          boothId: boothRows[0].id,
          userId: userRows[1].id,
        },
        {
          content: '좋아요!',
          emoji: 'funny',
          boothId: boothRows[1].id,
          userId: userRows[1].id,
        },
        {
          content: '이 부스는 최고입니다.',
          emoji: 'excited',
          boothId: boothRows[1].id,
          userId: userRows[1].id,
        },
        {
          content: '좋아요!',
          emoji: 'happy',
          boothId: boothRows[2].id,
          userId: userRows[2].id,
        },
        {
          content: '좋아요!',
          emoji: 'thrilling',
          boothId: boothRows[3].id,
          userId: userRows[3].id,
        },
        {
          content: '좋아요!',
          emoji: 'funny',
          boothId: boothRows[4].id,
          userId: userRows[4].id,
        },
      ],
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
