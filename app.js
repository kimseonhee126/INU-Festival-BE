const express = require('express');
const session = require('express-session');
const moment = require("moment");
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
const passport = require('passport');
const dotenv = require('dotenv');
const passportConfig = require('./passport');
const authRouter = require('./passport/auth.js');

// express 사용하기
const app = express();

// .env 파일 사용하기 위해
dotenv.config();

// passport 사용하기 위해
passportConfig();

const { Perform } = db;
const { Booth } = db;       //db.Booth
const { BoothDay } = db;    //db.BoothDay
const { Keywords } = db;     // db.Keyword
const { User } = db;        // db.User
const { OneLine } = db;     // db.OneLine
const { Notice } = db;      // db.Notice
const { NoticeImg } = db;   // db.NoticeImg

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

/* ----------------------------- 라우터 연결 ------------------------------ */
// /auth 라우터 연결
app.use('/auth', authRouter);

/* --------------------------------------------------------------------------------------------------------
메인 화면에 있는 동작 작성
1. 오늘의 라인업
2. 한 줄 외치기
    # 학번, 한 줄, 이모지
    # 키워드
3. 부스 랭킹 Top 5
-----------------------------------------------------------------------------------------------------------
*/

// 타임테이블 조회
app.get('/timetable', async (req, res) => {
    try {
        const performs = await Perform.findAll({
            attributes: ['id', 'name','day', 'time', 'category', 'detail', 'img'],
        });

        const performs2 = performs.map(perform => ({
            id: String(perform.id),
            name: perform.name,
            category: perform.category,
            detail: perform.detail,
            day: perform.day,
            startTime: perform.time.split(' ~ ')[0],
            endTime: perform.time.split(' ~ ')[1],
            img: perform.img,
        }));

        res.json({ performs: performs2});
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
    }
});

// 타임테이블 조회
app.get('/notices', async (req, res) => {
    try {
        const notices = await Notice.findAll({
            attributes: ['id', 'title','category', 'content', 'updatedAt'],
        });
        const notices2 = await Promise.all(notices.map(async (notice) => {
            const noticeId = notice.id;

            const noticeImgs = await NoticeImg.findAll({
                where: { noticeId: noticeId },
                attributes: ['id', 'img'],
            });

            return {
                ...notice.get({ plain: true }),
                noticeImgs: noticeImgs.map(day => day.get({ plain: true })),
            };
        }));
        const notices3 = notices2.map(notice => ({
            id: String(notice.id),
            category: notice.category,
            title: notice.title,
            content: notice.content,
            updatedAt: moment(notice.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            noticeImgs: notice.noticeImgs,
        }));

        res.json({ notices: notices3});
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
    }
});

// 메인페이지 - 부스 랭킹 Top 5
app.get('/ranking', async (req, res) => {
    try {
        const allBooths = await Booth.findAll({
            attributes: ['id', 'name', 'category', 'department', 'description', 'liked', 'img'],
            order: [['liked', 'DESC']], // liked 속성을 기준으로 내림차순으로 정렬
            limit: 5, // 상위 5개 결과만 반환
        });

        const Booths = await Promise.all(allBooths.map(async (booth) => {
            const boothId = booth.id;

            const myBoothDays = await BoothDay.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'day', 'time'],
            });

            return {
                ...booth.get({ plain: true }),
                boothDays: myBoothDays.map(day => day.get({ plain: true })),
            };
        }));

        res.send({ booths: Booths });
    } catch (err) {
        console.error('ERROR: ', err);
    }
});

// 메인페이지 - 부스 전체목록 조회하기
app.get('/booths', async (req, res) => {
    try {
        const allBooths = await Booth.findAll({
            attributes: ['id', 'name', 'category', 'department', 'description', 'liked', 'img'],
        });

        const Booths = await Promise.all(allBooths.map(async (booth) => {
            const boothId = booth.id;

            const myBoothDays = await BoothDay.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'day', 'time'],
            });

            return {
                ...booth.get({ plain: true }),
                boothDays: myBoothDays.map(day => day.get({ plain: true })),
            };
        }));

        res.send({ booths: Booths });
    } catch (err) {
        console.error('ERROR: ', err);
    }
});

/* 
메인 페이지 - 한 줄 외치기
    # 학번, 한 줄, 이모지
*/
app.get('/shout', async (req, res) => {
    try {
        const Onelines = await Promise.all((await OneLine.findAll({
            attributes: ['id', 'content', 'emoji', 'userId'],
        })).map(async (oneline) => ({
            id: String(oneline.id),
            content: oneline.content,
            emoji: oneline.emoji,
            studentID: String((await User.findOne({ where: { id: oneline.userId } })).studentID),
        })));

        res.json({ shouts: Onelines });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/* 
메인 페이지 - 한 줄 외치기
    # 키워드
*/
app.get('/keyword', async(req, res) => {
    try {
        const allKeywords = await Keywords.findAll({
            attributes: ['id', 'word'],
        });

        const someKeywords = allKeywords.slice(0, 10);

        // id 컬럼, studentID 컬럼을 문자열로 변환 후 response 보내기
        const keywords = someKeywords.map((keyword) => ({
            id: String(keyword.id),
            word: keyword.word,
        }));

        res.send({keywords:keywords});
    }
    catch (err) {
        console.log('Error: ', err);
        res.send('500 error');
    }
});

/* --------------------------------------------------------------------------------------------------------
지도에 있는 동작 작성

-----------------------------------------------------------------------------------------------------------
*/


/* --------------------------------------------------------------------------------------------------------
타임 테이블에 있는 동작 작성
1. 타임 테이블 - 오늘의 라인업
2. 타임 테이블 - 전체 공연 정보
-----------------------------------------------------------------------------------------------------------
*/

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
// kakao developer에서 port번호 4000으로 설정해서...번호 바꿨어...
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on ${process.env.PORT}`);
});