'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // foreign key constraint를 위해 booth 테이블의 id를 가져온다.
    const booths = await queryInterface.sequelize.query(`SELECT id from Booths;`);
    const boothRows = booths[0];

    await queryInterface.bulkInsert(
      'BoothDays',
      [
        {
          id: 1,
          day: '화',
          time: '13:00 ~ 17:00',
          boothId: boothRows[0].id,
        },
        {
          id: 2,
          day: '수',
          time: '14:00 ~ 17:00',
          boothId: boothRows[0].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BoothDays', null, {});
  }
};
