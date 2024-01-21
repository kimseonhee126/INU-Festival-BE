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

// 이것도 없애야 하는데...일단 냅두자...카카오 로그인...
const { User } = db;        // db.User

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
app.use('/booth', boothRouter);             // booth 분리
app.use('/notices', noticeRouter);          // notice 분리
app.use('/keyword', keywordRouter);         // keyword 분리
app.use('/shout', onelineRouter);           // oneline 분리


// 유저정보 가져오기
app.get('/user', async(req, res) => {
    
    try {
        const Users = await User.findAll({
            attributes: ['id', 'studentID', 'createdAt'],
        });

        const Users2 = Users.map((user) => ({
            id: String(user.id),
            studentID: String(user.studentID),
            createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }));
        res.send(Users2);
    }
    catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
    }
});

// Running the Server: 포트번호는 4000
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on ${process.env.PORT}`);
});