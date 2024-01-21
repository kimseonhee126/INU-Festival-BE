/*
Timetable 관련 항목
 */

const express = require('express');
const router = express.Router();
const db = require('../../models');

const { Perform } = db;     // db.Perform 사용하기

// 타임테이블 조회
router.get('/', async (req, res) => {
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

module.exports = router;