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
            attributes: ['id', 'name', 'category', 'department', 'description','liked'],
            order: [['liked', 'DESC']],
            limit: 5,
        });

        const Booths = await Promise.all(allBooths.map(async (booth) => {
            const boothId = booth.id;

            const myBoothDays = await BoothDay.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'day', 'time', 'location', 'x', 'y'],
            });

            const myBoothImgs = await BoothImg.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'url'],
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
                boothImgs: myBoothImgs.map(img => img.get({ plain: true })),
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
                attributes: ['id', 'day', 'time', 'location', 'x', 'y'],
            });

            const myBoothImgs = await BoothImg.findAll({
                where: { boothId: boothId },
                attributes: ['id', 'url'],
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
                boothImgs: myBoothImgs.map(img => img.get({ plain: true })),
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
            attributes: ['id', 'day', 'time', 'location', 'x', 'y'],
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
router.get('/:id/comment', async (req, res) => {
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
            include: [{
                model: User,
                attributes: ['studentId', 'snsId'], // 사용자의 studentId와 snsId를 포함
            }],
        });

        const boothComments = myBoothComments.map(comment => {
            // 사용자의 studentId가 있으면 그 값을 userId로 사용, 없으면 snsId를 userId로 사용
            const userId = comment.User.studentId ? String(comment.User.studentId) : String(comment.User.snsId);

            return {
                userId, // 새로운 userId 정의
                content: comment.content,
                createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            };
        });

        res.send({ boothComments });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: 'Server error' });
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
router.post('/:id/comment', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const tokenValue = token ? token.split(' ')[1] : null;
        const existUser = await User.findOne({ where: { token: tokenValue } });
        if (!existUser) { // 로그인을 하지 않은 경우
            return res.status(400).send({ success: false, message: '로그인 먼저 하세요!' });
        }
        const boothId = req.params.id;
        const booth = await Booth.findOne({ where: { id: boothId } });

        if (!booth) { // 부스가 존재하지 않는 경우
            return res.status(404).send({ message: '해당 id를 가진 부스가 없습니다.' });
        }

        const comment = Comment.build(req.body);
        // 필드별로 값을 할당
        comment.userId = existUser.id;
        await comment.save(); 

        // createdAt과 updatedAt을 포맷하여 응답 객체에 추가
        const formattedResponse = {
            ...comment.toJSON(), // comment 객체의 나머지 필드를 포함
            id: String(comment.id),
            boothId: String(booth.id),
            userId: existUser.studentId,
            createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        };
        res.send(formattedResponse);

    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: '댓글 생성에 실패했습니다.' });
    }
});

//부스 댓글 수정하기
router.put('/:bid/comment/:cid', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const tokenValue = token ? token.split(' ')[1] : null;
        const existUser = await User.findOne({ where: { token: tokenValue } });
        if (!existUser) { // 로그인을 하지 않은 경우
            return res.status(400).send({ success: false, message: '로그인 먼저 하세요!' });
        }
        const boothId = req.params.bid;
        const booth = await Booth.findOne({ where: { id: boothId } });

        if (!booth) { // 부스가 존재하지 않는 경우
            return res.status(404).send({ message: '해당 id를 가진 부스가 없습니다.' });
        }

        const commentId = req.params.cid;
        const comment = await Comment.findOne({ where: { id: commentId } });

        if (!comment) { // 댓글이 존재하지 않는 경우
            return res.status(404).send({ message: '해당 id를 가진 댓글이 없습니다.' });
        }
        
        if (comment.userId !== existUser.id) { // 댓글 작성자가 아닌 경우
            return res.status(403).send({ message: '댓글 작성자만 수정할 수 있습니다.' });
        }

        console.log(comment);

        await comment.update(req.body);
        console.log(comment);
        const formattedResponse = {
            id: String(comment.id),
            content: comment.content,
            emoji: comment.emoji,
            boothId: String(booth.id),
            userId: existUser.studentId,
            createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        };
        res.send(formattedResponse);
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: '댓글 수정에 실패했습니다.' });
    }
});

//부스 댓글 삭제하기
router.delete('/:bid/comment/:cid', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const tokenValue = token ? token.split(' ')[1] : null;
        const existUser = await User.findOne({ where: { token: tokenValue } });
        if (!existUser) { // 로그인을 하지 않은 경우
            return res.status(400).send({ success: false, message: '로그인 먼저 하세요!' });
        }
        const boothId = req.params.bid;
        const booth = await Booth.findOne({ where: { id: boothId } });

        if (!booth) { // 부스가 존재하지 않는 경우
            return res.status(404).send({ message: '해당 id를 가진 부스가 없습니다.' });
        }

        const commentId = req.params.cid;
        const comment = await Comment.findOne({ where: { id: commentId } });

        if (!comment) { // 댓글이 존재하지 않는 경우
            return res.status(404).send({ message: '해당 id를 가진 댓글이 없습니다.' });
        }
        
        if (comment.userId !== existUser.id) { // 댓글 작성자가 아닌 경우
            return res.status(403).send({ message: '댓글 작성자만 삭제할 수 있습니다.' });
        }

        await comment.destroy();
        res.send({ success: true, message: '댓글이 삭제되었습니다.' });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: '댓글 삭제에 실패했습니다.' });
    }
});



module.exports = router;