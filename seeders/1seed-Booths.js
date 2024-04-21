'use strict';
let XLSX = require('xlsx');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Booths AUTO_INCREMENT = 1;');

    let workbook = XLSX.readFile(__dirname + '/../public/stylesheets/booth_data_list.xlsx');
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫번째 시트를 선택
    let range = XLSX.utils.decode_range(worksheet['!ref']); // 시트의 데이터 범위를 가져옵니다.
    console.log(range);

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
        category: row[1] || '',
        department: row[2] || '',
        description: row[3] || '',
        time: row[4] || '',
        location: row[5] || '',
        x: row[6] || '',
        y: row[7] || '',
        liked: 0,
        markerImage: row[9] || '',
      };
      console.log(`markerImage : ${obj.markerImage}`);
      data.push(obj);
    }
    return queryInterface.bulkInsert('Booths', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};