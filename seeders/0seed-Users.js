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
          token: '123451',
          studentId: '201100000',
        },
        {
          token: '123452',
          studentId: '201200000',
        },
        {
          token: '123453',
          studentId: '201300000',
        },
        {
          token: '123454',
          studentId: '201400000',
        },
        {
          token: '123455',
          studentId: 'chonghak',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};