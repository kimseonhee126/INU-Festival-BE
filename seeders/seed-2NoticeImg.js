'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // id를 1부터 다시 시작하는 로직 추가
    await queryInterface.sequelize.query('ALTER TABLE NoticeImgs AUTO_INCREMENT = 1;');

    // foreign key constraint를 위해 notice 테이블의 id를 가져온다.
    const notices = await queryInterface.sequelize.query(`SELECT id from Notices;`);
    const noticeRows = notices[0];

    await queryInterface.bulkInsert(
      'NoticeImgs',
      [
        {
          "id": 1,
          "noticeId": 1,
          "img": "https://13.125.142.74.nip.io/img/notice1-01.jpeg"
        },
        {
          "id": 2,
          "noticeId": 1,
          "img": "https://13.125.142.74.nip.io/img/notice1-02.jpeg"
        },
        {
          "id": 3,
          "noticeId": 1,
          "img": "https://13.125.142.74.nip.io/img/notice1-03.jpeg"
        },
        {
          "id": 4,
          "noticeId": 1,
          "img": "https://13.125.142.74.nip.io/img/notice1-04.jpeg"
        },
        {
          "id": 5,
          "noticeId": 2,
          "img": "https://13.125.142.74.nip.io/img/notice2-01.jpg"
        },
        {
          "id": 6,
          "noticeId": 2,
          "img": "https://13.125.142.74.nip.io/img/notice2-02.jpg"
        },
        {
          "id": 7,
          "noticeId": 2,
          "img": "https://13.125.142.74.nip.io/img/notice2-03.jpg"
        },
        {
          "id": 8,
          "noticeId": 3,
          "img": "https://13.125.142.74.nip.io/img/notice18-01.jpg"
        },
        {
          "id": 9,
          "noticeId": 3,
          "img": "https://13.125.142.74.nip.io/img/notice18-02.jpg"
        },
        {
          "id": 10,
          "noticeId": 3,
          "img": "https://13.125.142.74.nip.io/img/notice18-03.jpg"
        },
        {
          "id": 11,
          "noticeId": 3,
          "img": "https://13.125.142.74.nip.io/img/notice18-04.jpg"
        },
        {
          "id": 12,
          "noticeId": 4,
          "img": "https://13.125.142.74.nip.io/img/notice3-01.jpg"
        },
        {
          "id": 13,
          "noticeId": 4,
          "img": "https://13.125.142.74.nip.io/img/notice3-02.jpg"
        },
        {
          "id": 14,
          "noticeId": 4,
          "img": "https://13.125.142.74.nip.io/img/notice3-03.jpg"
        },
        {
          "id": 15,
          "noticeId": 4,
          "img": "https://13.125.142.74.nip.io/img/notice3-04.jpg"
        },
        {
          "id": 16,
          "noticeId": 5,
          "img": "https://13.125.142.74.nip.io/img/notice4-01.jpg"
        },
        {
          "id": 17,
          "noticeId": 5,
          "img": "https://13.125.142.74.nip.io/img/notice4-02.jpg"
        },
        {
          "id": 18,
          "noticeId": 5,
          "img": "https://13.125.142.74.nip.io/img/notice4-03.jpg"
        },
        {
          "id": 19,
          "noticeId": 6,
          "img": "https://13.125.142.74.nip.io/img/notice5-01.jpg"
        },
        {
          "id": 20,
          "noticeId": 6,
          "img": "https://13.125.142.74.nip.io/img/notice5-02.jpg"
        },
        {
          "id": 21,
          "noticeId": 6,
          "img": "https://13.125.142.74.nip.io/img/notice5-03.jpg"
        },
        {
          "id": 22,
          "noticeId": 6,
          "img": "https://13.125.142.74.nip.io/img/notice5-04.jpg"
        },
        {
          "id": 23,
          "noticeId": 6,
          "img": "https://13.125.142.74.nip.io/img/notice5-05.jpg"
        },
        {
          "id": 24,
          "noticeId": 6,
          "img": "https://13.125.142.74.nip.io/img/notice5-06.jpg"
        },
        {
          "id": 25,
          "noticeId": 7,
          "img": "https://13.125.142.74.nip.io/img/notice16-01.jpg"
        },
        {
          "id": 26,
          "noticeId": 7,
          "img": "https://13.125.142.74.nip.io/img/notice16-02.jpg"
        },
        {
          "id": 27,
          "noticeId": 8,
          "img": "https://13.125.142.74.nip.io/img/notice17-01.jpg"
        },
        {
          "id": 28,
          "noticeId": 8,
          "img": "https://13.125.142.74.nip.io/img/notice17-02.jpg"
        },
        {
          "id": 29,
          "noticeId": 8,
          "img": "https://13.125.142.74.nip.io/img/notice17-03.jpg"
        },
        {
          "id": 30,
          "noticeId": 8,
          "img": "https://13.125.142.74.nip.io/img/notice17-04.jpg"
        },
        {
          "id": 31,
          "noticeId": 8,
          "img": "https://13.125.142.74.nip.io/img/notice17-05.jpg"
        },
        {
          "id": 32,
          "noticeId": 8,
          "img": "https://13.125.142.74.nip.io/img/notice17-06.jpg"
        },
        {
          "id": 33,
          "noticeId": 9,
          "img": "https://13.125.142.74.nip.io/img/notice6-01.jpg"
        },
        {
          "id": 34,
          "noticeId": 9,
          "img": "https://13.125.142.74.nip.io/img/notice6-02.jpg"
        },
        {
          "id": 35,
          "noticeId": 9,
          "img": "https://13.125.142.74.nip.io/img/notice6-03.jpg"
        },
        {
          "id": 36,
          "noticeId": 10,
          "img": "https://13.125.142.74.nip.io/img/notice14-01.jpg"
        },
        {
          "id": 37,
          "noticeId": 10,
          "img": "https://13.125.142.74.nip.io/img/notice14-02.jpg"
        },
        {
          "id": 38,
          "noticeId": 10,
          "img": "https://13.125.142.74.nip.io/img/notice14-03.jpg"
        },
        {
          "id": 39,
          "noticeId": 10,
          "img": "https://13.125.142.74.nip.io/img/notice14-04.jpg"
        },
        {
          "id": 40,
          "noticeId": 10,
          "img": "https://13.125.142.74.nip.io/img/notice14-05.jpg"
        },
        {
          "id": 41,
          "noticeId": 11,
          "img": "https://13.125.142.74.nip.io/img/notice7-01.jpg"
        },
        {
          "id": 42,
          "noticeId": 11,
          "img": "https://13.125.142.74.nip.io/img/notice7-02.jpg"
        },
        {
          "id": 43,
          "noticeId": 11,
          "img": "https://13.125.142.74.nip.io/img/notice7-03.jpg"
        },
        {
          "id": 44,
          "noticeId": 12,
          "img": "https://13.125.142.74.nip.io/img/notice19-01.jpg"
        },
        {
          "id": 45,
          "noticeId": 12,
          "img": "https://13.125.142.74.nip.io/img/notice19-02.jpg"
        },
        {
          "id": 46,
          "noticeId": 12,
          "img": "https://13.125.142.74.nip.io/img/notice19-03.jpg"
        },
        {
          "id": 47,
          "noticeId": 12,
          "img": "https://13.125.142.74.nip.io/img/notice19-04.jpg"
        },
        {
          "id": 48,
          "noticeId": 12,
          "img": "https://13.125.142.74.nip.io/img/notice19-05.jpg"
        },
        {
          "id": 49,
          "noticeId": 13,
          "img": "https://13.125.142.74.nip.io/img/notice20-01.jpg"
        },
        {
          "id": 50,
          "noticeId": 13,
          "img": "https://13.125.142.74.nip.io/img/notice20-02.jpg"
        },
        {
          "id": 51,
          "noticeId": 14,
          "img": "https://13.125.142.74.nip.io/img/notice15-01.jpg"
        },
        {
          "id": 52,
          "noticeId": 14,
          "img": "https://13.125.142.74.nip.io/img/notice15-02.jpg"
        },
        {
          "id": 53,
          "noticeId": 14,
          "img": "https://13.125.142.74.nip.io/img/notice15-03.jpg"
        },
        {
          "id": 54,
          "noticeId": 15,
          "img": "https://13.125.142.74.nip.io/img/notice8-01.jpg"
        },
        {
          "id": 55,
          "noticeId": 15,
          "img": "https://13.125.142.74.nip.io/img/notice8-02.jpg"
        },
        {
          "id": 56,
          "noticeId": 15,
          "img": "https://13.125.142.74.nip.io/img/notice8-03.jpg"
        },
        {
          "id": 57,
          "noticeId": 15,
          "img": "https://13.125.142.74.nip.io/img/notice8-04.jpg"
        },
        {
          "id": 58,
          "noticeId": 16,
          "img": "https://13.125.142.74.nip.io/img/notice9-01.jpg"
        },
        {
          "id": 59,
          "noticeId": 16,
          "img": "https://13.125.142.74.nip.io/img/notice9-02.jpg"
        },
        {
          "id": 60,
          "noticeId": 16,
          "img": "https://13.125.142.74.nip.io/img/notice9-03.jpg"
        },
        {
          "id": 61,
          "noticeId": 16,
          "img": "https://13.125.142.74.nip.io/img/notice9-04.jpg"
        },
        {
          "id": 62,
          "noticeId": 17,
          "img": "https://13.125.142.74.nip.io/img/notice10-01.jpg"
        },
        {
          "id": 63,
          "noticeId": 17,
          "img": "https://13.125.142.74.nip.io/img/notice10-02.jpg"
        },
        {
          "id": 64,
          "noticeId": 17,
          "img": "https://13.125.142.74.nip.io/img/notice10-03.jpg"
        },
        {
          "id": 65,
          "noticeId": 17,
          "img": "https://13.125.142.74.nip.io/img/notice10-04.jpg"
        },
        {
          "id": 66,
          "noticeId": 18,
          "img": "https://13.125.142.74.nip.io/img/notice11-01.jpg"
        },
        {
          "id": 67,
          "noticeId": 18,
          "img": "https://13.125.142.74.nip.io/img/notice11-02.jpg"
        },
        {
          "id": 68,
          "noticeId": 18,
          "img": "https://13.125.142.74.nip.io/img/notice11-03.jpg"
        },
        {
          "id": 69,
          "noticeId": 19,
          "img": "https://13.125.142.74.nip.io/img/notice12-01.jpg"
        },
        {
          "id": 70,
          "noticeId": 19,
          "img": "https://13.125.142.74.nip.io/img/notice12-02.jpg"
        },
        {
          "id": 71,
          "noticeId": 19,
          "img": "https://13.125.142.74.nip.io/img/notice12-03.jpg"
        },
        {
          "id": 72,
          "noticeId": 19,
          "img": "https://13.125.142.74.nip.io/img/notice12-04.jpg"
        },
        {
          "id": 73,
          "noticeId": 20,
          "img": "https://13.125.142.74.nip.io/img/notice13-01.jpg"
        },
        {
          "id": 74,
          "noticeId": 20,
          "img": "https://13.125.142.74.nip.io/img/notice13-02.jpg"
        },
        {
          "id": 75,
          "noticeId": 20,
          "img": "https://13.125.142.74.nip.io/img/notice13-03.jpg"
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NoticeImgs', null, {});
  }
};
