const express = require('express');
const router = express.Router();
const db = require('../../models');

const { Booth } = db;       //db.Booth
const { BoothDay } = db;    //db.BoothDay

// 메인페이지 - 부스 랭킹 Top 5
router.get('/ranking', async (req, res) => {
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
router.get('/all', async (req, res) => {
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
// 부스 하나 조회하기
router.get('/all', async (req, res) => {
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

module.exports = router;

