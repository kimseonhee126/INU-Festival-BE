'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Booths AUTO_INCREMENT = 1;');

    await queryInterface.bulkInsert(
      'Booths',
      [
        // ----------------------- 비주점 -----------------------

        // index : 0
        {
          name: '취업경력개발원',
          category: '비주점',
          department: '교내',
          description: '취업프로그램홍보',
          liked: 0,
        },

        // index : 1
        {
          name: '소비자생활협동조합',
          category: '비주점',
          department: '교내',
          description: '조합 및 유니상점(기념품) 홍보',
          liked: 555,
        },

        // index : 2
        {
          name: '대학생활지원팀',
          category: '비주점',
          department: '교내',
          description: '스트레스 주무르기, 건강한 음주문화 캠페인, 장애인식개선 프로그램, 포일아트 체험, 봉사 미니공모전 홍보',
          liked: 354,
        },

        // index : 3
        {
          name: '정보전산팀',
          category: '비주점',
          department: '교내',
          description: '카카오워크 홍보',
          liked: 777,
        },

        // index : 4
        {
          name: '교수학습지원팀',
          category: '비주점',
          department: '교내',
          description: '학생설계융합전공 및 INU Surprise 인증제 등 홍보',
          liked: 2500,
        },

        // ----------------------- 주점 -----------------------

        // index : 5
        {
          name: '알코올존',
          category: '주점',
          department: '총학생회',
          // description: '탁구 부스입니다.',
          liked: 2000,
        },

        // index : 6
        {
          name: '인문대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 25345,
        },

        // index : 7
        {
          name: '경영대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 2345,
        },

        // index : 8
        {
          name: '법학부',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 452,
        },

        // index : 9
        {
          name: '도시과학대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 1000,
        },

        // index : 10
        {
          name: '야간대학',
          category: '주점',
          department: '딘과대',
          // description: '탁구 부스입니다.',
          liked: 1100,
        },

        // index : 11
        {
          name: '사범대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 1200,
        },

        // index : 12
        {
          name: '정보기술대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 1300,
        },

        // index : 13
        {
          name: '자연과학대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 1400,
        },

        // index : 14
        {
          name: '생명과학기술대학',
          category: '주점',
          department: '단과대',
          // description: '탁구 부스입니다.',
          liked: 1000,
        },

        // ----------------------- 푸드트럭 -----------------------

        // index : 15
        {
          name: '인사이더',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '타코야끼 푸드트럭입니다!',
          liked: 30,
        },

        // index : 16
        {
          name: '지그재그와플',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '와플 푸드트럭입니다!',
          liked: 33,
        },

        // index : 17
        {
          name: '춘향전',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '전 푸드트럭입니다!',
          liked: 43,
        },

        // index : 18
        {
          name: '지그재그와플',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '와플 푸드트럭입니다!',
          liked: 55,
        },

        // index : 19
        {
          name: '철판맨',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '야끼소바 푸드트럭입니다!',
          liked: 10,
        },

        // index : 20
        {
          name: '더머거',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '꼬치 푸드트럭입니다!',
          liked: 11,
        },

        // index : 21
        {
          name: '러브디아',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '불초밥 푸드트럭입니다!',
          liked: 21,
        },

        // index : 22
        {
          name: '온더라디오',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '음료판매 푸드트럭입니다!',
          liked: 11,
        },

        // index : 23
        {
          name: '만수무강',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '덮밥 푸드트럭입니다!',
          liked: 44,
        },

        // index : 24
        {
          name: '천하제일관',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '닭강정 푸드트럭입니다!',
          liked: 5,
        },

        // index : 25
        {
          name: '떡볶이먹고가',
          category: '푸드트럭',
          department: '푸드트럭',
          description: '떡볶이 푸드트럭입니다!',
          liked: 77,
        },

        // ----------------------- 번외 -----------------------
        
        // index : 26
        {
          name: '꿈베이커리',
          category: '비주점',
          department: '교외',
          description: '꿈베이커리 입니다!',
          liked: 35,
        },

        // index : 27
        {
          name: '팔찌부스',
          category: '비주점',
          department: '교외',
          description: '팔찌부스 입니다!',
          liked: 10,
        },

        // index : 28
        {
          name: '포토부스',
          category: '비주점',
          department: '교외',
          description: '포토부스 입니다!',
          liked: 88,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Booths', null, {});
  }
};