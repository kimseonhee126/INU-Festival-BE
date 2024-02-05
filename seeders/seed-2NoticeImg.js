'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE NoticeImgs AUTO_INCREMENT = 1;');

    // foreign key constraint를 위해 notice 테이블의 id를 가져온다.
    const notices = await queryInterface.sequelize.query(`SELECT id from Notices;`);
    const noticeRows = notices[0];

    await queryInterface.bulkInsert(
      'NoticeImgs',
      [
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[0].id,
        },
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[0].id,
        },
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[1].id,
        },
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[1].id,
        },
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[2].id,
        },
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[2].id,
        },
        {
          img: 'BOL.jpeg',
          noticeId: noticeRows[3].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NoticeImgs', null, {});
  }
};
