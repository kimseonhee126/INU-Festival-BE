'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE BoothDays AUTO_INCREMENT = 1;');

    // foreign key constraint를 위해 booth 테이블의 id를 가져온다.
    const booths = await queryInterface.sequelize.query(`SELECT id from Booths;`);
    const boothRows = booths[0];

    await queryInterface.bulkInsert(
      'BoothDays',
      [
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.47289869744282',
          y: '124.85198131418802',
          boothId: boothRows[0].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.473715135124635',
          y: '124.85061888448256',
          boothId: boothRows[0].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.472978002380915',
          y: '124.8505252367218',
          boothId: boothRows[1].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.472901453814174',
          y: '124.85089280822974',
          boothId: boothRows[2].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.47252063607873',
          y: '124.85221865811097',
          boothId: boothRows[2].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.47313207919032',
          y: '124.85234123498789',
          boothId: boothRows[3].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '10호관과 11호관 사이',
          x: '33.23542345324325',
          y: '124.24523453252345',
          boothId: boothRows[3].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '10호관과 12호관 사이',
          x: '33.23453245234523',
          y: '124.13414231432141',
          boothId: boothRows[4].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '10호관과 12호관 사이',
          x: '33.12341241243124',
          y: '124.12341967987696',
          boothId: boothRows[4].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '10호관과 12호관 사이',
          x: '33.12334656343124',
          y: '124.12245235324124',
          boothId: boothRows[5].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          location: '10호관과 12호관 사이',
          x: '33.12324325235124',
          y: '124.12341242435255',
          boothId: boothRows[5].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '10호관과 12호관 사이',
          x: '33.11431123243124',
          y: '124.12134513543124',
          boothId: boothRows[6].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          location: '10호관과 12호관 사이',
          x: '33.26784736254312',
          y: '124.12345364224312',
          boothId: boothRows[6].id,
        },
        {
          day: '2',
          time: '13:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.13452624665312',
          y: '124.12343607655470',
          boothId: boothRows[7].id,
        },
        {
          day: '3',
          time: '14:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.15676894372544',
          y: '124.11345678946724',
          boothId: boothRows[7].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.11245306958304',
          y: '124.13245637832543',
          boothId: boothRows[8].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.14536425234546',
          y: '124.14567844784344',
          boothId: boothRows[8].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.11234567356452',
          y: '124.25346375388357',
          boothId: boothRows[9].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.14352635748654',
          y: '124.11435647358782',
          boothId: boothRows[9].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.12432567554634',
          y: '124.11235465265266',
          boothId: boothRows[10].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.14560705679647',
          y: '124.25636744564363',
          boothId: boothRows[10].id,
        },
        {
          day: '1',
          time: '13:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.54637865354456',
          y: '124.12356434526734',
          boothId: boothRows[11].id,
        },
        {
          day: '2',
          time: '14:00 ~ 17:00',
          location: '12호관과 13호관 사이',
          x: '33.09875635433456',
          y: '124.14563543467345',
          boothId: boothRows[11].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BoothDays', null, {});
  }
};
