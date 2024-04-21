'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE BoothDays AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/booth_data_list.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[1]]; // 두번째 시트를 선택
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.

    let data = [];
    // 데이터 범위 내의 모든 행을 순회합니다.
    for(let i = range.s.r + 1; i <= range.e.r; i++){
      let row = [];
      for(let j = range.s.c; j <= range.e.c; j++) {
        let cell_address = {c:j, r:i};
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        row.push(worksheet[cell_ref] ? worksheet[cell_ref].v : null);
      }
      let obj = {
        day: row[0] || '',
        boothId: parseInt(row[1], 10) || 1, // 문자열 'boothId'를 정수로 변환
      };
      data.push(obj);
    //   console.log(`data : ${data}`);
    }
    return queryInterface.bulkInsert('BoothDays', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BoothDays', null, {});
  }
};