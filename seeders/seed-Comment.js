'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Comments AUTO_INCREMENT = 1;');

    const insertData = [];
    for(let boothId = 70; boothId <= 77; boothId++) {
        // 각 boothId에 대해 같은 댓글을 3개씩 추가합니다.
        for(let commentCount = 0; commentCount < 3; commentCount++) {
            insertData.push({
                content: '댓글입니다.',
                emoji: 'happy',
                boothId: boothId,
                userId: commentCount + 1,
            });
        }
    }
    await queryInterface.bulkInsert('Comments', insertData);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
