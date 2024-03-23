"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query(
      "ALTER TABLE BoothImgs AUTO_INCREMENT = 1;"
    );

    // foreign key constraint를 위해 booth 테이블의 id를 가져온다.
    const booths = await queryInterface.sequelize.query(
      `SELECT id from Booths;`
    );
    const boothRows = booths[0];

    const boothImgsData = [];
    for (let i = 0; i < 77; i++) {
      for (let j = 0; j < 3; j++) { // 각 boothId에 대해 이미지를 3번씩 추가합니다.
        boothImgsData.push({
          url: "BOL.jpeg",
          boothId: boothRows[i].id,
        });
      } 
    }

    await queryInterface.bulkInsert("BoothImgs", boothImgsData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BoothImgs", null, {});
  },
};
