const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
const passport = require('passport');
const dotenv = require('dotenv');
const passportConfig = require('./router/passport');

// express 사용하기
const app = express();

// .env 파일 사용하기 위해
dotenv.config();

// passport 사용하기 위해
passportConfig();

// 테스트용
app.get('/', async(req, res) => {
    res.send('status 200 Ok');
});

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

// passport 초기화
app.use(passport.initialize())
// passport index.js에 있는 'deserializeUser'함수 호출
app.use(passport.session())

/* ----------------------------- 라우터 분리 ------------------------------ */
// /auth 라우터 연결
const authRouter = require('./router/passport/auth.js');
const timetableRouter = require('./router/perform/perform.js');
const boothRouter = require('./router/booth/booth.js');
const noticeRouter = require('./router/notice/notice.js');
const keywordRouter = require('./router/keyword/keyword.js');
const onelineRouter = require('./router/oneline/oneline.js');

app.use('/auth', authRouter);               // 카카오 로그인 -> 로그인
app.use('/timetable', timetableRouter);     // timetable 분리
app.use('/booths', boothRouter);             // booth 분리
app.use('/notices', noticeRouter);          // notice 분리
app.use('/keywords', keywordRouter);         // keyword 분리
app.use('/shout', onelineRouter);           // oneline 분리

// Running the Server: 포트번호는 4000
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on ${process.env.PORT}`);
});