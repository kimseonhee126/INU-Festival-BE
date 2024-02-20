const express = require('express');
const session = require('express-session');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
const User = require('../../models').User;
// .env 파일 사용하기 위해
dotenv.config();

// JSON 미들웨어 사용
router.use(express.json());

// 세션 미들웨어 사용
router.use(session({
  resave: false,
  saveUninitialized: false,
  secret: `${process.env.COOKIE_SECRET}`,
  cookie: {
      httpOnly: true,
      secure: false,
  },
}));

router.get('/me', async(req, res) => {
  // 
  try{
    // 토큰 받기
    const token = req.headers['authorization'];
    const tokenValue = token ? token.split(' ')[1] : null;
    
    console.log(`token 값으로 User 찾기 : ${tokenValue}`);
    // 해당 토큰을 가지고 있는 user 찾기
    const findUser = await User.findOne({ where: { token: tokenValue } });

    let id;
    let name;

    if (!findUser) {
      return res.status(403).json({ message: "토큰을 찾을 수 없습니다!" });
    }

    if (findUser.provider === 'LMS') {
      // 세션 넘겨주기 -> LMS
      req.session.user = {
        id: findUser.barcode,
        name: findUser.studentId,
      };

      // 프론트로 response 넘겨주기 -> LMS
      id = findUser.barcode;
      name = findUser.studentId;
      return res.json({ id, name })

    } else {
      // 세션 넘겨주기 -> kakao
      req.session.user = {
        id: findUser.snsId,
        name: findUser.nick,
      };

      // 프론트로 response 넘겨주기 -> kakao
      id = findUser.snsId;
      name = findUser.nick;
      return res.json({ id, name })
    }
  } catch(err) {
    // 에러 출력
    console.error('에러: ', err.message);
    res.status(500).json({ message: '서버 내부 오류' });
  }
});

// request 올라가라..!!
router.post('/lms', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    const token = req.headers['authorization'];
    const tokenValue = token ? token.split(' ')[1] : null;

    // 기존에 등록된 사용자 찾기
    const existUser = await User.findOne({ where: { token: tokenValue } });
    const existUser2 = await User.findOne({ where: { studentId } });
    if (!existUser) { // 해당 토큰을 가진 사용자가 없는 경우
      if (!existUser2) { // 해당 토큰, 학번을 가진 사용자가 없는 경우
        // LMS API에 로그인 요청 보내기
        const response = await axios.post(`${process.env.LMS_URL}`, { studentId, password });
        
        // API로부터 받은 토큰을 사용해 새 사용자 생성
        const accessToken = response.data.rememberMeToken; 
        await User.create({
          token: accessToken,
          studentId: studentId,
          provider: 'LMS',
        });
        return res.status(200).json({ accessToken });
      } else { // 해당 학번을 가진 사용자가 있는 경우 (토큰은 없는 경우) -> 로그아웃된 사용자
        // 기존 사용자의 토큰을 업데이트
        await User.update({ token: tokenValue }, { where: { studentId } });
        return res.status(200).json({ token: tokenValue });
      }

      // 새로 받은 토큰으로 응답
    } else {
      // 이미 학번, 토큰 둘다 존재하는 사용자의 경우 기존 토큰으로 응답
      return res.status(200).json({ token: tokenValue });
    }
  } catch (error) {
    console.error('에러:', error.message);
    // API 요청 실패 또는 다른 에러에 대한 처리
    if (error.response) {
      // API로부터의 응답 에러 처리
      res.status(error.response.status).json({ success: false, message: error.response.data.message || '외부 API 요청 에러' });
    } else {
      // 요청을 보내는 중 문제가 발생한 경우
      res.status(500).json({ success: false, message: '서버 내부 오류' });
    }
  }
});

router.get('/logout', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const tokenValue = token ? token.split(' ')[1] : null;

    if (!tokenValue) {
      return res.status(400).json({ success: false, message: '로그아웃 요청이 올바르지 않습니다.' });
    }

    // 먼저 해당 토큰을 가진 사용자를 찾습니다.
    const user = await User.findOne({ where: { token: tokenValue } });

    if (!user) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    // 사용자를 찾았다면, 토큰을 초기화합니다.
    await User.update({ token: "" }, { where: { id: user.id } });

    // 성공적으로 로그아웃 처리가 완료되었음을 클라이언트에 알립니다.
    return res.status(200).json({ success: true, message: '성공적으로 로그아웃 되었습니다.' });
  } catch (err) {
    console.error('Error : ', err);
    res.status(500).json({ success: false, message: '로그아웃 처리 중 오류가 발생했습니다.' });
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