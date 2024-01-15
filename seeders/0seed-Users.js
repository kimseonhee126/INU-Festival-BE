'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        // id를 1부터 다시 시작하는 로직 추가
        await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;');
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          studentID: 202000001,
        },
        {
          id: 2,
          studentID: 202000002
        },
        {
          id: 3,
          studentID: 202000003
        },
        {
          id: 4,
          studentID: 202000004
        },
        {
          id: 5,
          studentID: 202000005
        },
        {
          id: 6,
          studentID: 202000006
        },
        {
          id: 7,
          studentID: 202000007
        },
        {
          id: 8,
          studentID: 202000008
        },
        {
          id: 9,
          studentID: 202000009
        },
        {
          id: 10,
          studentID: 202000010
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
