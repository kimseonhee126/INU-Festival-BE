const express = require('express');
const session = require('express-session');
const router = express.Router();
const axios = require('axios');
const User = require('../../models').User;

// JSON 미들웨어 사용
router.use(express.json());
// 세션 미들웨어 사용
router.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
      httpOnly: true,
      secure: false,
  },
}));

const apiUrl = 'https://api.inu-cafeteria.app/student/login';

// request 올라가라..!!
router.post('/', async (req, res) => {
    try {
      const { studentId, password } = req.body;
  
      // axios를 사용하여 로그인 API에 POST 요청 보내기
      const response = await axios.post(apiUrl, { studentId, password });
  
      // API 응답에서 필요한 정보 추출
      const { rememberMeToken, barcode } = response.data;

      // 이미 user가 존재한다면
      const existUser = await User.findOne({ where: { barcode } });

      if (existUser) {
        // 
        req.session.studentId = existUser.studentId;
        console.log(`사용자 ${existUser.studentId}로 로그인되었습니다.\n`);
      }
      else {
        // Sequelize를 사용하여 User 테이블에 데이터 삽입
        const newUser = await User.create({
          token: rememberMeToken,
          barcode: barcode,
          studentId: studentId,
        });

        // 세션에 학번 저장
        req.session.studentId = studentId;
        req.session.token = rememberMeToken;
        console.log('----------------- 세션에 학번 저장 시작 --------------')
        console.log(req.session.studentId);
        console.log(req.session.token);
        console.log('----------------- 세션에 학번 저장 끝 --------------')

        // 콘솔에 출력
        console.log('학번 : ', studentId);
        console.log('rememberMeToken:', rememberMeToken);
        console.log('barcode:', barcode);
        console.log(`학번 : ${studentId} 데이터가 저장되었습니다.`);
      }
      // 클라이언트에 응답
      res.status(200).redirect('/');
    } catch (error) {
      console.error('에러:', error.message);
      res.status(500).json({ success: false, message: '서버 내부 오류' });
    }
});

// axios.post(apiUrl, requestData)
//   .then(response => {
//     // API 응답에서 rememberMeToken과 barcode를 추출
//     const { rememberMeToken, barcode } = response.data;

//     // 콘솔에 출력
//     console.log('학번 : ', requestData.studentId);
//     console.log('rememberMeToken:', rememberMeToken);
//     console.log('barcode:', barcode);

//     try {  
//         // User 테이블에 데이터 삽입
//         const newUser = User.create({
//           token: rememberMeToken,
//           barcode: barcode,
//           studentId: requestData.studentId,
//         });
  
//         console.log(`학번 : ${requestData.studentId} 데이터가 저장되었습니다.`);
//       } catch (error) {
//         console.error('Error : ', error);
//       }
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   }
// );

module.exports = router;