const express = require('express');
const router = express.Router();
const db = require('../../models');

const { realDays } = require('../../app');

// JSON 미들웨어 사용
router.use(express.json());

const { Booth } = db;       //db.Booth
const { BoothDay } = db;    //db.BoothDay
const { BoothImg } = db;   //db.Booth

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
        };

        res.send({ booth: boothResponse });
    } catch (err) {
        console.error('ERROR: ', err);
        res.status(500).send({ message: 'Server error' }); // 에러 응답 추가
    }
});

// 부스 좋아요

router.post('/liked/:id', async (req, res) => {
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


module.exports = router;