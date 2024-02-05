const express = require('express');
const router = express.Router();
const db = require('../../models');
const moment = require("moment");

const { realDays } = require('../../app');

// JSON 미들웨어 사용
router.use(express.json());

const { Booth } = db;       //db.Booth
const { BoothDay } = db;    //db.BoothDay
const { BoothImg } = db;   //db.Booth
const { Comment } = db;   //db.Comment
const { User } = db;     //db.User

// 카테고리 조회하기
router.get('/category', async (req, res) => {
    try {
        const categories = {
            days: realDays.slice(0, 3), // 첫 3개 요일을 가져옵니다.
            filters: ["주점", "비주점", "푸드트럭"], // 필터 옵션을 배열로 관리하여 확장성을 높입니다.
        }
        res.json({ categories });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ message: 'An error occurred while fetching categories' });
    }
});

// 메인페이지 - 부스 랭킹 Top 5
router.get('/ranking', async (req, res) => {
    try {
        const allBooths = await Booth.findAll({
            attributes: ['id', 'name', 'category', 'department', 'description', 'liked'],
            order: [['liked', 'DESC']],
            limit: 5,
        });

        const Booths = await Promise.all(allBooths.map(async (booth) => {
            const boothId = booth.id;

            const myBoothDays = await BoothDay.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'day', 'time'],
            });

            const boothDaysWithRealDay = myBoothDays.map(boothDay => {
                const dayIndex = boothDay.day - 1; // 배열 인덱스를 위해 1 감소
                return {
                    ...boothDay.get({ plain: true }),
                    day: realDays[dayIndex], // 숫자를 실제 요일로 변환
                };
            });

            return {
                ...booth.get({ plain: true }),
                boothDays: boothDaysWithRealDay,
            };
        }));

        res.send({ booths: Booths });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send('Server error');
    }
});

// 메인페이지 - 부스 전체목록 조회하기
router.get('/all', async (req, res) => {
    try {
        const allBooths = await Booth.findAll({
            attributes: ['id', 'name', 'category', 'department', 'description', 'liked'],
        });

        const Booths = await Promise.all(allBooths.map(async (booth) => {
            const boothId = booth.id;

            const myBoothDays = await BoothDay.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'day', 'time'],
            });

            const boothDaysWithRealDay = myBoothDays.map(boothDay => {
                const dayIndex = boothDay.day - 1;
                return {
                    ...boothDay.get({ plain: true }),
                    day: realDays[dayIndex],
                };
            });

            return {
                ...booth.get({ plain: true }),
                boothDays: boothDaysWithRealDay,
            };
        }));

        res.send({ booths: Booths });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send('Server error');
    }
});
// 부스 하나 조회하기
router.get('/:id', async (req, res) => {
    try {
        const boothId = req.params.id; 
        const booth = await Booth.findOne({
            where: { id: boothId }, 
            attributes: ['id', 'name', 'category', 'department', 'description', 'liked'],
        });

        if (!booth) {
            return res.status(404).send({ message: 'Booth not found' });
        }

        const myBoothDays = await BoothDay.findAll({
            where: { boothId: boothId },
            attributes: ['id', 'day', 'time'],
        });

        const myBoothImgs = await BoothImg.findAll({
            where: { boothId: boothId },
            attributes: ['id', 'url'],
        });

        const myBoothComments = await Comment.findAll({
            where: { boothId: boothId },
        });

        const myBoothComments2 = myBoothComments.map(comment => ({
            id: String(comment.id),
            content: comment.content,
            userId: comment.userId,
            createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        }));

        // 변환 로직 추가: boothDay의 day 숫자를 요일 문자열로 변환
        const boothDaysWithRealDay = myBoothDays.map(boothDay => {
            const dayIndex = boothDay.day - 1; // 배열 인덱스를 위해 1 감소
            return {
                ...boothDay.get({ plain: true }),
                day: realDays[dayIndex], // 숫자를 실제 요일로 변환
            };
        });

        const boothResponse = {
            ...booth.get({ plain: true }),
            boothDays: boothDaysWithRealDay,
            boothImgs: myBoothImgs.map(img => img.get({ plain: true })),
            boothComments: myBoothComments2,
        };

        res.send({ booth: boothResponse });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: 'Server error' }); // 에러 응답 추가
    }
});

// 부스 하나 댓글 모두 조회하기
router.get('/comment/:id', async (req, res) => {
    try {
        const boothId = req.params.id; 
        const booth = await Booth.findOne({
            where: { id: boothId }, 
        });

        if (!booth) {
            return res.status(404).send({ message: 'Booth not found' });
        }

        const myBoothComments = await Comment.findAll({
            where: { boothId: boothId },
        });

        const boothComments = myBoothComments.map(comment => ({
            id: String(comment.id),
            content: comment.content,
            userId: String(comment.userId),
            createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        }));

        res.send({ boothComments });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: 'Server error' }); // 에러 응답 추가
    }
});

// 부스 좋아요 업데이트하기
router.put('/liked/:id', async (req, res) => {
    try {
        const boothId = req.params.id;
        const likeCount = req.body.likeCount;
        const booth = await Booth.findOne({ where: { id: boothId } });

        const liked = booth.liked;

        if (!booth) {
            return res.status(404).send({ message: 'Booth not found' });
        }
        await booth.update({ liked: liked + likeCount });
        res.send({ booth: booth.get({ plain: true }) });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: 'Server error' });
    }
});

// 부스 댓글 추가하기
router.post('/comment/:id', async (req, res) => {
    try {
        /*------------------------------------------------------ */
        // 편집 권한 있는 user인지 확인하기 위해 session 검색
        if (!req.session.studentId) {
            return res.status(400).send({ message: '로그인 먼저 하세요!' });
        }
        const sessionId = req.session.studentId;
        const user = await User.findOne({ where: { studentId: sessionId } });
        const userRank = user.rank;

        if (userRank != 1) {
            try {
                const boothId = req.params.id;
                const booth = await Booth.findOne({ where: { id: boothId } });
        
                if (!booth) {
                    return res.status(404).send({ message: 'Booth not found' });
                }
        
                const newComment = req.body;
        
                const comment = Comment.build(newComment);
                await comment.save();
                // 확인용 출력
                console.log(`newComment : ${newComment.content}\n`);
                res.send(`${newComment.content}.`);
            }
            catch(err) {
                console.error('ERROR: ', err);
                res.status(500).send({ message: 'Server error' });
            };
        }
        else {
            // 편집 권한이 없으면 메시지 뜨게 하기!!
            console.log(`${sessionId}는 편집할 권한이 없습니다.\n`);
            res.send(`${sessionId}는 편집할 권한이 없습니다.`);
        }
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: 'Server error' });
    }
});




module.exports = router;