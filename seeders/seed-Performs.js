'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 시퀀스를 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE Performs AUTO_INCREMENT = 1;');
    await queryInterface.bulkInsert(
      'Performs',
      [
        // ----------------------- 05/07(화) -----------------------
        {
          name: '커플리온스',
          date: '5월 07일',
          day: 'day1',
          time: '18:00 ~ 19:00',
          category: '동아리',
          detail: '커플리온스 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 07일',
          day: 'day1',
          time: '19:00 ~ 19:30',
          category: '연예인',
          detail: 'Comming Soon~',
          img: 'temp.img',
        },
        {
          name: '커플리온스',
          date: '5월 07일',
          day: 'day1',
          time: '19:30 ~ 19:40',
          category: '동아리',
          detail: '인천대학교 공식 응원단 커플리온스의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '경품추첨',
          date: '5월 07일',
          day: 'day1',
          time: '19:40 ~ 19:50',
          category: '이벤트',
          detail: '퀴즈 풀고 경품 받아가자!',
          img: 'temp.img',
        },
        {
          name: '한국체육대학교',
          date: '5월 07일',
          day: 'day1',
          time: '19:50 ~ 20:05',
          category: '외부행사',
          detail: '한국체육대학교 응원단 소속 천마의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '커플리온스 OB 공연',
          date: '5월 07일',
          day: 'day1',
          time: '20:07 ~ 20:14',
          category: '동아리',
          detail: '인천대학교 공식 응원단 커플리온스의 OB 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '경품추첨',
          date: '5월 07일',
          day: 'day1',
          time: '20:14 ~ 20:20',
          category: '이벤트',
          detail: '퀴즈 풀고 경품 받아가자!',
          img: 'temp.img',
        },
        {
          name: '커플리온스',
          date: '5월 07일',
          day: 'day1',
          time: '20:20 ~ 20:26',
          category: '동아리',
          detail: '인천대학교 공식 응원단 커플리온스의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '알케인',
          date: '5월 07일',
          day: 'day1',
          time: '20:26 ~ 20:42',
          category: '외부공연',
          detail: '알케인의 참조공연입니다.',
          img: 'temp.img',
        },
        {
          name: '경품추첨',
          date: '5월 07일',
          day: 'day1',
          time: '20:42 ~ 20:47',
          category: '이벤트',
          detail: '퀴즈 풀고 경품 받아가자!',
          img: 'temp.img',
        },
        {
          name: '커플리온스',
          date: '5월 07일',
          day: 'day1',
          time: '20:47 ~ 20:55',
          category: '동아리',
          detail: '인천대학교 공식 응원단 커플리온스의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 07일',
          day: 'day1',
          time: '21:00 ~ 21:30',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 07일',
          day: 'day1',
          time: '21:30 ~ 22:00',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },

        // ----------------------- 05/08(수) -----------------------
        {
          name: '시니어 모델 패션쇼',
          date: '5월 08일',
          day: 'day2',
          time: '15:40 ~ 16:00',
          category: '행사',
          detail: '시니어 모델 패션쇼입니다.',
          img: 'temp.img',
        },
        {
          name: '울림',
          date: '5월 08일',
          day: 'day2',
          time: '16:00 ~ 16:25',
          category: '동아리',
          detail: '동아리 울림의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '포크라인',
          date: '5월 08일',
          day: 'day2',
          time: '16:25 ~ 16:53',
          category: '동아리',
          detail: '동아리 울림의 포크라인의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '포크라인',
          date: '5월 08일',
          day: 'day2',
          time: '16:53 ~ 17:25',
          category: '동아리',
          detail: '동아리 울림의 크레퍼스의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '포크라인',
          date: '5월 08일',
          day: 'day2',
          time: '16:25 ~ 18:00',
          category: '동아리',
          detail: '동아리 울림의 파이오니아의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 08일',
          day: 'day2',
          time: '18:00 ~ 18:30',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '함성',
          date: '5월 08일',
          day: 'day2',
          time: '18:30 ~ 19:03',
          category: '동아리',
          detail: '동아리 울림의 파이오니아의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '인스디스',
          date: '5월 08일',
          day: 'day2',
          time: '19:03 ~ 19:44',
          category: '동아리',
          detail: '동아리 울림의 인스디스의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: 'IUDC',
          date: '5월 08일',
          day: 'day2',
          time: '19:44 ~ 20:31',
          category: '동아리',
          detail: '동아리 울림의 IUDC의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 08일',
          day: 'day2',
          time: '21:31 ~ 21:01',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 08일',
          day: 'day2',
          time: '21:01 ~ 22:01',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },

        // ----------------------- 05/09(목) -----------------------
        {
          name: '참가자 공연',
          date: '5월 09일',
          day: 'day3',
          time: '17:05 ~ 17:10',
          category: '개인공연',
          detail: '참가자분의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '참가자 공연',
          date: '5월 09일',
          day: 'day3',
          time: '17:03 ~ 17:15',
          category: '개인공연',
          detail: '참가자분의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '참가자 공연',
          date: '5월 09일',
          day: 'day3',
          time: '17:15 ~ 17:27',
          category: '개인공연',
          detail: '참가자분의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '참가자 공연',
          date: '5월 09일',
          day: 'day3',
          time: '17:27 ~ 17:39',
          category: '개인공연',
          detail: '참가자분의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '참가자 공연',
          date: '5월 09일',
          day: 'day3',
          time: '17:39 ~ 17:51',
          category: '개인공연',
          detail: '참가자분의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '참가자 공연',
          date: '5월 09일',
          day: 'day3',
          time: '17:51 ~ 18:03',
          category: '개인공연',
          detail: '참가자분의 공연입니다.',
          img: 'temp.img',
        },
        {
          name: '투표 및 수상자 발표',
          date: '5월 09일',
          day: 'day3',
          time: '18:03 ~ 18:27',
          category: '이벤트',
          detail: '가요제 마무리 시간입니다.',
          img: 'temp.img',
        },
        {
          name: '총위원의원회 소개',
          date: '5월 09일',
          day: 'day3',
          time: '18:27 ~ 18:32',
          category: '이벤트',
          detail: '가요제 마무리 시간입니다.',
          img: 'temp.img',
        },
        {
          name: '총학생회 소개',
          date: '5월 09일',
          day: 'day3',
          time: '18:32 ~ 18:35',
          category: '이벤트',
          detail: '가요제 마무리 시간입니다.',
          img: 'temp.img',
        },
        {
          name: '베스트 드레서',
          date: '5월 09일',
          day: 'day3',
          time: '18:32 ~ 18:45',
          category: '이벤트',
          detail: '가요제 마무리 시간입니다.',
          img: 'temp.img',
        },
        {
          name: '외부인을 이겨라(커플게임)',
          date: '5월 09일',
          day: 'day3',
          time: '18:45 ~ 18:54',
          category: '외부행사',
          detail: '외부인을 이겨라! 커플게임(안고 스쿼트)',
          img: 'temp.img',
        },
        {
          name: '경품추첨',
          date: '5월 09일',
          day: 'day3',
          time: '18:54 ~ 19:00',
          category: '이벤트',
          detail: '총학 리플렛 응모권 추첨(당첨자 상품 수령 및 퇴장)',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 09일',
          day: 'day3',
          time: '19:00 ~ 19:30',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 09일',
          day: 'day3',
          time: '19:30 ~ 20:00',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 09일',
          day: 'day3',
          time: '20:00 ~ 20:30',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '불꽃놀이',
          date: '5월 09일',
          day: 'day3',
          time: '20:30 ~ 20:35',
          category: '이벤트',
          detail: '불꽃놀이 진행~!',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 09일',
          day: 'day3',
          time: '20:35 ~ 21:05',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
        {
          name: '아티스트 공연',
          date: '5월 09일',
          day: 'day3',
          time: '21:05 ~ 22:05',
          category: '연예인',
          detail: 'Comming Soon~!',
          img: 'temp.img',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Performs', null, {});
  },
};
