'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Booths',
      [
        {
          id: 1,
          name: '총학부스',
          category: '비주점',
          department: '총학생회',
          description: '총학생회 부스입니다.',
          liked: 0,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};
