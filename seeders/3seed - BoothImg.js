'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE BoothImgs AUTO_INCREMENT = 1;');

    // foreign key constraint를 위해 booth 테이블의 id를 가져온다.
    const booths = await queryInterface.sequelize.query(`SELECT id from Booths;`);
    const boothRows = booths[0];

    await queryInterface.bulkInsert(
      'BoothImgs',
      [
        {
            url: 'BOL.jpeg',
            boothId: boothRows[0].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[1].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[2].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[3].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[4].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[5].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[6].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[7].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[8].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[9].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[10].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[11].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[12].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[13].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[14].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[15].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[16].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[17].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[18].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[19].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[20].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[21].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[22].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[23].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[24].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[25].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[26].id,
        },
        {
            url: 'BOL.jpeg',
            boothId: boothRows[27].id,
        },{
            url: 'BOL.jpeg',
            boothId: boothRows[28].id,
        },
      ]
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
