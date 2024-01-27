const express = require('express');
const session = require('express-session');
const router = express.Router();
const axios = require('axios');
const User = require('../../models').User;

const apiUrl = 'https://api.inu-cafeteria.app/student/login';

// request로 받아오기
const requestData = {
    studentId: '202100249',
    password: '####'
};

router.get('/', async (req, res) => {
    try {
      const { studentId, password } = requestData;
  
      // axios를 사용하여 로그인 API에 POST 요청 보내기
      const response = await axios.post(apiUrl, { studentId, password });
  
      // API 응답에서 필요한 정보 추출
      const { rememberMeToken, barcode } = response.data;
  
      // 콘솔에 출력
      console.log('학번 : ', studentId);
      console.log('rememberMeToken:', rememberMeToken);
      console.log('barcode:', barcode);
  
      // Sequelize를 사용하여 User 테이블에 데이터 삽입
      const newUser = await User.create({
        token: rememberMeToken,
        barcode: barcode,
        studentId: studentId,
      });
  
      console.log(`학번 : ${studentId} 데이터가 저장되었습니다.`);

      // 세션에 학번 저장
      req.session.studentId = studentId;
  
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