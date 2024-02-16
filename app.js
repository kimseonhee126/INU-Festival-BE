const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('./models').User;
const passportConfig = require('./router/passport');

const realDays =['월', '화', '수'];
const realDates = ['2024-05-01', '2024-05-02', '2024-05-03']

module.exports = {
  realDays,
  realDates,
};

// express 사용하기
const app = express();

// .env 파일 사용하기 위해
dotenv.config();

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));
app.use(cors());
// 세션 관련 미들웨어 사용
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

// 테스트용
app.get('/', (req, res) => {
  try {
    const showToken = req.session.user.token;

    if (showToken) {
      res.send(showToken);
    } else {
      console.log(`로그인이 안되어 있습니다!`);
      res.status(200)
    }
  } catch(err) {
    console.error('Error : ', err);
  }
});

// 요일과 날짜
app.get('/days', (req, res) => {
    res.send({ days: realDays, dates: realDates });
});

// 로그아웃
app.get('/logout', async (req, res) => {
  try {
    const showToken = req.session.user.token;

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

        res.status(200).send('로그아웃 성공');
      }
    });
  } catch(err) {
    console.error('Error : ', err);
    res.status(500).json({ success: false, message: '서버 내부 오류' });
  }
});
  
// passport 사용하기 위해
passportConfig();
// passport 초기화
app.use(passport.initialize())
// passport index.js에 있는 'deserializeUser'함수 호출
app.use(passport.session())

/* ----------------------------- 라우터 분리 ------------------------------ */
// /auth 라우터 연결
const kakaoRouter = require('./router/passport/auth.js');
const lmsRouter = require('./router/passport/lms.js');
const timetableRouter = require('./router/perform/perform.js');
const boothRouter = require('./router/booth/booth.js');
const noticeRouter = require('./router/notice/notice.js');
const keywordRouter = require('./router/keyword/keyword.js');
const onelineRouter = require('./router/oneline/oneline.js');
const adminBoothRouter = require('./router/admin/booth.js');

app.use('/auth', kakaoRouter);                   // 카카오 로그인
app.use('/login', lmsRouter);                // lms 로그인
app.use('/timetable', timetableRouter);          // timetable 분리
app.use('/booth', boothRouter);                 // booth 분리
app.use('/notice', noticeRouter);               // notice 분리
app.use('/keyword', keywordRouter);             // keyword 분리
app.use('/shout', onelineRouter);                // oneline 분리
app.use('/admin', adminBoothRouter);             // Booth 관리자 페이지

// Running the Server: 포트번호는 4000
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on ${process.env.PORT}`);
});