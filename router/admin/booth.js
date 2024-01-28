const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('../../models');
const User = require('../../models').User;

const { Booth } = db;       //db.Booth

// JSON 미들웨어 사용
router.use(express.json());
// 세션 관련 미들웨어 사용
router.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

// GET 요청 : 테스트용
router.get('/booth/:id', async(req, res) => {
    const sessionId = req.session.studentId;
    console.log('admin: ', sessionId);
});

// POST 요청 : 새로운 부스 추가
router.post('/booth', async(req, res) => {
    try {
        // 편집 권한 있는 user인지 확인하기 위해 session 검색
        const sessionId = req.session.studentId;
        const user = await User.findOne({ where: { studentId: sessionId } });
        const userRank = user.rank;
        console.log(`userRank : ${user.rank}`);

        if (userRank != 1) {
            // 새로운 부스 만들기
            const newBooth = req.body;

            // 새로운 부스 저장하기
            try {
                const booth = Booth.build(newBooth);
                await booth.save();
                // 확인용 출력
                console.log(`newBooth : ${newBooth.name}\n`);
                res.send(`${newBooth.name}이 잘 추가 되었습니다.`);
            }
            catch(err) {
                // 에러 출력
                console.error('Error : ', err);
            };
        }
        else {
            // 편집 권한이 없으면 메시지 뜨게 하기!!
            console.log(`${sessionId}는 편집할 권한이 없습니다.\n`);
            res.send(`${sessionId}는 편집할 권한이 없습니다.`);
        }
    }
    catch(err) {
        // 에러 출력
        console.error('Error : ', err);
    };
});

// PUT 요청 : 기존 부스 수정
router.put('/booth/:id', async(req, res) => {
    try {
        // 편집 권한 있는 user인지 확인하기 위해 session 검색
        const sessionId = req.session.studentId;
        const user = await User.findOne({ where: { studentId: sessionId } });
        const userRank = user.rank;
        console.log(`userRank : ${user.rank}`);

        // rank=1 만 일반 user 이므로 나머지 사람들은 편집권한 다 있게!!
        if (user.rank != 1) {
            const { id } = req.params;
            const newBooth = req.body;
            const booth = await Booth.findOne(
                { where: { id } },
            );

            // 편집 권한이 있으면 부스 수정~!~!
            try {
                Object.keys(newBooth).forEach((prop) => {
                    booth[prop] = newBooth[prop];
                });

                await booth.save();
                res.send(`${newBooth.name}이 잘 수정되었습니다.`);
            }
            catch(err) {
                // 에러 출력
                console.error('Error : ', err);
            };
        }
        else {
            // 편집 권한이 없으면 메시지 뜨게 하기!!
            console.log(`${sessionId}는 편집할 권한이 없습니다.`);
            res.send(`${sessionId}는 편집할 권한이 없습니다.`);
        }
    }
    catch(err) {
        // 에러 출력
        console.error('Error : ', err);
    };
});

module.exports = router;