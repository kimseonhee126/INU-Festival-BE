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
  
      // axios를 사용하여 로그인 API에 POST 요청 보내기
      const response = await axios.post(`${process.env.LMS_URL}`, { studentId, password });
  
      // API 응답에서 필요한 정보 추출
      const { rememberMeToken, barcode } = response.data;

      // 이미 user가 존재한다면
      const existUser = await User.findOne({ where: { barcode } });

      if (existUser) {
        const accessToken = existUser.token;

        // 세션에 저장하기
        req.session.user = {
          studentId: existUser.studentId,
          token: existUser.token,
          provider: existUser.provider,
        };

        // 클라이언트로 토큰 보내기
        return res.status(200).json({ accessToken });
      }
      else {
        const accessToken = rememberMeToken;
        // Sequelize를 사용하여 User 테이블에 데이터 삽입
        const newUser = await User.create({
          token: rememberMeToken,
          barcode: barcode,
          studentId: studentId,
        });

        // 세션에 저장하기
        req.session.user = {
          studentId: newUser.studentId,
          token: newUser.token,
          provider: newUser.provider,
        };

        console.log(`새로운 유저 : ${accessToken}, ${studentId}`);    // 확인용
        return res.status(200).json({ accessToken });
      }
    } catch (error) {
      // 토큰 발급 No
      console.error('에러:', error.message);
      res.status(403).json({ success: false, message: '서버 내부 오류!! 토큰 없음' });
    }
});

router.get('/logout', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const tokenValue = token ? token.split(' ')[1] : null;

    // session 제거
    req.session.destroy(async (err) => {
      if (err) {
        console.error('세션 제거 실패', err);
        res.status(500).json({ success: false, message: '세션 제거 실패' });
      } else {
        console.log('세션 제거 성공');
        const destroyUser = await User.findOne({ where: { token: tokenValue } });

        if (destroyUser) {
          await destroyUser.destroy();
          console.log('사용자 정보 삭제 성공!');
        } else {
          console.log('사용자 정보가 없습니다.');
        }

        return res.status(200).json({ success: true, message: '로그아웃 성공' });
      }
    });
  } catch(err) {
    console.error('Error : ', err);
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