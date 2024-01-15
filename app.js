const express = require('express');
const app = express();
const moment = require("moment");
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
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
            attributes: ['id', 'name','date', 'time', 'category', 'detail', 'img'],
        });

        const performs2 = performs.map(perform => ({
            id: String(perform.id),
            name: perform.name,
            date: perform.date,
            category: perform.category,
            detail: perform.detail,
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

// Running the Server: 포트번호는 5000
app.listen(5000, async(req, res) => {
    console.log('5000 server is running');
});