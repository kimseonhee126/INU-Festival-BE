'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // // id를 1부터 다시 시작하는 로직 추가
    // await queryInterface.sequelize.query('ALTER TABLE BoothImgs AUTO_INCREMENT = 1;');

    // const insertData = [];
    // for(let boothId = 1; boothId <= 77; boothId++) {
    //     // 각 boothId에 대해 같은 이미지를 3개씩 추가합니다.
    //     for(let imgCount = 0; imgCount < 3; imgCount++) {
    //         insertData.push({
    //             url: 'http://127.0.0.1:4000/img/sample_img.png',
    //             boothId: boothId,
    //         });
    //     }
    // }

    // // 생성된 데이터 배열로 bulkInsert를 실행합니다.
    // await queryInterface.bulkInsert('BoothImgs', insertData);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('BoothImgs', null, {});
  }
};
