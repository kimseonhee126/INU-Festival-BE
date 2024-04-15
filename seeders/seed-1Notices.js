'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Notices AUTO_INCREMENT = 1;');
    await queryInterface.bulkInsert(
      'Notices',
      [
        {
          "title": "알콜존 안내",
          "category": "공지사항",
          "content": `위치 : 도서관과 중앙광장 사이
          시간: 10월 06일 18시 - 23시
          주의 사항: * 알콜존은 음식이나 주류를 제공하는 곳이 아닌 장소만 마련되어 있는 공간입니다. 테이블 및 의자를 사용한 후, 뒷정리는 스스로 해야합니다. * 알콜존은 예약제가 아니며, 자리가 없을 시 사용 불가할 수 있습니다.`,
        },
        {
          "title": "돗자리 대여",
          "category": "공지사항",
          "content": `위치 : 6호관 앞, 시간: 10월06일 10 - 23시, 활동 내용: 돗자리, 테이블 대여, 가격: 돗자리 3000원, 테이블 3000원, 세트 5000원, 대여방법: 총학 부스에서 일행 중 대표자 1인이 명단 작성 및 입금 확인 후 대여, 반납방법: 돗자리와 테이블 상태 확인 후 명단에 서명`,
        },
        {
          "title": "축제기간 변경되는 버스 노선",
          "category": "공지사항",
          "content": `버스 노선 변경 시간: 10월 05일 - 10월 06일(2일간)`,
        },
        {
          "title": "경품추첨 안내",
          "category": "이벤트",
          "content": "경품추첨 안내입니다~ 위치는~ 시간은...",
        },
        {
            "title": "축제 귀가 버스",
            "category": "공지사항",
            "content": `운행 기간 : 10월 06일, 운행 시간 : 23시 - 24시(3대 수시 순환 운행), 탑승 위치 : 27호관 앞, 버스 노선 : 인천대학교 27호관 앞 > 인천대입구역
            `,
        },
        {
            "title": "재학생존 입장안내",
            "category": "공지사항",
            "content": `위치 : 암벽등반장 앞(무대 앞), 시간 : 17시부터 입장 시작`,
        },
        {
            "title": "인형뽑기",
            "category": "이벤트 및 공지사항",
            "content": `위치 : 암벽등반장 앞(무대 앞), 시간 : 17시부터 입장 시작`,
        },
        {
            "title": "포토부스",
            "category": "이벤트 및 공지사항",
            "content": `위치 : 11호관 2층 로비, 시간 : 10월 06일 - 10월 18일 24시간 운영, 가격 : 4컷 프레임 4,000원(현금, 카드 결제 가능)`,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }
};
