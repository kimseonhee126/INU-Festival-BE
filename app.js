const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
const dotenv = require('dotenv');
const User = require('./models').User;
// .env 파일 사용하기 위해
dotenv.config();

// express 사용하기
const app = express();

const realDays =['월', '화', '수'];
const realDates = ['2024-05-01', '2024-05-02', '2024-05-03'];

module.exports = {
  realDays,
  realDates,
};

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));
// Cors 미들웨어 사용
app.use(cors());
// // Morgan 미들웨어 사용
// app.use(morgan('dev'));
// 세션 관련 미들웨어 사용
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: `${process.env.COOKIE_SECRET}`,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

/* ----------------------------- 라우터 분리 ------------------------------ */
// const kakaoRouter = require('./router/auth/auth.js');
const loginRouter = require('./router/auth/login.js');
const logoutRouter = require('./router/auth/logout.js');
const timetableRouter = require('./router/perform/perform.js');
const boothRouter = require('./router/booth/booth.js');
const noticeRouter = require('./router/notice/notice.js');
const keywordRouter = require('./router/keyword/keyword.js');
const onelineRouter = require('./router/oneline/oneline.js');
const adminBoothRouter = require('./router/admin/booth.js');

// app.use('/auth', kakaoRouter);                   // 카카오 로그인
app.use('/user', loginRouter);                   // lms 로그인, 로그아웃
app.use('/timetable', timetableRouter);          // timetable 분리
app.use('/booth', boothRouter);                 // booth 분리
app.use('/notice', noticeRouter);               // notice 분리
app.use('/keyword', keywordRouter);             // keyword 분리
app.use('/shout', onelineRouter);                // oneline 분리
app.use('/admin', adminBoothRouter);             // Booth 관리자 페이지

// 테스트용
app.get('/', async (req, res) => {
  try {
    console.log('루트 페이지~!');
    res.status(200).json({ message: '프론트 친구들 안녕? 힘들때 웃는자가 일류야..!!' });
  } catch(err) {
    console.error('Error : ', err);
    res.status(500).json({ message: '서버 내부 오류' });
  }
});

// 요일과 날짜
app.get('/days', (req, res) => {
    res.send({ days: realDays, dates: realDates });
});

// Running the Server: 포트번호는 4000
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on ${process.env.PORT}`);
});