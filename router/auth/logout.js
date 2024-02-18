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

router.get('/', async (req, res) => {
    try {
      const showToken = req.session.user.token;
      console.log(`로그아웃에서 showToken ${showToken}`);
  
      // session 제거
      req.session.destroy(async (err) => {
        if (err) {
          console.error('세션 제거 실패', err);
          res.status(500).json({ success: false, message: '세션 제거 실패' });
        } else {
          console.log('세션 제거 성공');
          const destroyUser = await User.findOne({ where: { token: showToken } });
  
          if (destroyUser) {
            await destroyUser.destroy();
            console.log('사용자 정보 삭제 성공!');
          } else {
            console.log('사용자 정보가 없습니다.');
          }
  
          res.status(200).json({ success: false, message: '세션 제거 성공' });
        }
      });
    } catch(err) {
      console.error('Error : ', err);
      res.status(500).json({ success: false, message: '서버 내부 오류' });
    }
  });
  
  module.exports = router;