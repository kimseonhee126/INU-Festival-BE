'use strict';

let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Notices AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/perform2.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫번째 시트를 선택
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.

    let data = [];
    // 데이터 범위 내의 모든 행을 순회합니다.
    for(let i = range.s.r + 1; i <= range.e.r; i++){ // range.s.r + 1 은 헤더를 제외하고 데이터부터 시작
      let row = [];
      for(let j = range.s.c; j <= range.e.c; j++) {
        let cell_address = {c:j, r:i};
        let cell_ref = XLSX.utils.encode_cell(cell_address);
        row.push(worksheet[cell_ref] ? worksheet[cell_ref].v : null);
      }
      let obj = {
        name: row[0] || '',
        date: row[1] || '',
        day: row[2] || '',
        time: row[3] || '',
        category: row[4] || '',
        detail: row[5] || '',
        img: row[6] || '',
      };
      data.push(obj);
    }
    return queryInterface.bulkInsert('Performs', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Performs', null, {});
  }
};
