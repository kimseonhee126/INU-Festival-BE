'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Booths AUTO_INCREMENT = 1;');

    // foreign key constraint를 위해 booth 테이블의 id를 가져온다.
    const booths = await queryInterface.sequelize.query(`SELECT id from Booths;`);
    const boothRows = booths[0];

    await queryInterface.bulkInsert(
      'BoothDays',
      [
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[0].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[0].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          boothId: boothRows[1].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[2].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[2].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[3].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[3].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[4].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[4].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[5].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          boothId: boothRows[5].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[6].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          boothId: boothRows[6].id,
        },
        {
          day: '2',
          time: '13:00 ~ 17:00',
          boothId: boothRows[7].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          boothId: boothRows[7].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[8].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[8].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[9].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[9].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[10].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[10].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          boothId: boothRows[11].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          boothId: boothRows[11].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BoothDays', null, {});
  }
};
