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
        // ----------------------- 비주점 -----------------------
        {
          day: '1',
          time: '10:00 ~ 16:00',
          location: '11호관과 16호관 사이',
          x: '33.47305162363254',
          y: '124.85082026533007',
          boothId: boothRows[0].id,
        },
        {
          day: '1',
          time: '10:00 ~ 16:00',
          location: '11호관과 16호관 사이',
          x: '33.473126237536725',
          y: '124.85096469515423',
          boothId: boothRows[1].id,
        },

        {
          day: '1',
          time: '10:00 ~ 16:00',
          location: '11호관',
          x: '33.47315740715203',
          y: '124.85151459911633',
          boothId: boothRows[2].id,
        },

        {
          day: '1',
          time: '10:00 ~ 16:00',
          location: '11호관과 8호관 사이',
          x: '33.47309029994933',
          y: '124.85138719193706',
          boothId: boothRows[3].id,
        },
        {
          day: '1',
          time: '10:00 ~ 16:00',
          location: '11호관과 8호관 사이',
          x: '33.47309029994933',
          y: '124.85138719193706',
          boothId: boothRows[4].id,
        },

        // ----------------------- 주점 -----------------------
        
        // 알코올존
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.473428935143076',
          y: '124.85303515938209',
          boothId: boothRows[5].id,
        },

        // 인문대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '14호관과 15호관 사이',
          x: '33.47384602375437',
          y: '124.85172130975658',
          boothId: boothRows[6].id,
        },

        // 경영대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '14호관과 13호관 사이',
          x: '33.473852684683685',
          y: '124.85189753442913',
          boothId: boothRows[7].id,
        },

        // 법학부
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '13호관과 12호관 사이',
          x: '33.47358318768267',
          y: '124.8521580147786',
          boothId: boothRows[8].id,
        },

        // 도시과학대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '11호관과 8호관 사이',
          x: '33.473045860055954',
          y: '124.85131945509595',
          boothId: boothRows[9].id,
        },
        // 야간대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '11호관과 8호관 사이',
          x: '33.47300517317625',
          y: '124.85126022991277',
          boothId: boothRows[10].id,
        },
        // 사범대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '중앙광장 앞',
          x: '33.473122387460634',
          y: '124.85178219627299',
          boothId: boothRows[11].id,
        },

        // 정보기술대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '7호관 앞',
          x: '33.47289479533417',
          y: '124.85196420200423',
          boothId: boothRows[12].id,
        },

        // 자연과학대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '5호관 앞',
          x: '33.4735100837176',
          y: '124.85314071115653',
          boothId: boothRows[13].id,
        },

        // 생명과학기술대학
        {
          day: '1',
          time: '18:00 ~ 23:00',
          location: '8호관과 10호관(게스트하우스) 사이',
          x: '33.47248238547012',
          y: '124.85126023261049',
          boothId: boothRows[14].id,
        },

        // 푸드트럭
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[15].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[16].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[17].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[18].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[19].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[20].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[21].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[22].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[23].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[24].id,
        },
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.47307864290849',
          y: '124.85217046839479',
          boothId: boothRows[25].id,
        },

        // 꿈베이커리
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '중앙광장과 학산도서관 사이',
          x: '33.473479991564126',
          y: '124.85119687924436',
          boothId: boothRows[26].id,
        },

        // 팔찌부스
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '17호관 앞',
          x: '33.473038843471556',
          y: '124.85029141874132',
          boothId: boothRows[27].id,
        },

        // 포토부스
        {
          day: '1',
          time: '10:00 ~ 23:00',
          location: '11호관과 8호관 사이',
          x: '33.47299473440301',
          y: '124.85128199832998',
          boothId: boothRows[28].id,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BoothDays', null, {});
  }
};
