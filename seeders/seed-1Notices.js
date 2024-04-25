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
          "content": '상시 운영 중이나 17시 이전에는 과도한 음주 및 자리 차지 (3시간 이상)는 삼가해주시기 바랍니다. '
        },
        {
          "title": "본무대 경품추첨 안내",
          "category": "이벤트",
          "content": '축제 마지막 날 (5/9) 본무대에서 경품 추첨이 있습니다! 많은 관심 부탁드립니다!',
        },
        {
          "title": "버스킹",
          "category": "공지사항",
          "content": '5/9(목) 17호관 앞  00시 버스킹 무대',
        },

        {
            "title": "무대반입 금지물품",
            "category": "공지사항",
            "content": `<반입 금지 물품>

            - 모든 음료 및 음식물 (단, 뚜껑이 있는 물은 가능)
            - 공연에 방해되는 물품(꽃다발, 풍선, 병/ 캔류 등)
            - 대포 카메라
            - 장우산
            - 주류
            - 간이의자
            
            * 반려동물 동반 금지 `,
        },

      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notices', null, {});
  }
};
