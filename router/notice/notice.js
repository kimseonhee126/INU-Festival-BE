const express = require('express');
const router = express.Router();
const moment = require("moment");
const db = require('../../models');

const { Notice } = db;      // db.Notice

// 공지사항 조회
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.findAll({
            attributes: ['id', 'title','category', 'content', 'img', 'updatedAt'],
        });

        const notices2 = notices.map(notice => ({
            id: String(notice.id),
            title: notice.title,
            category: notice.category,
            content: notice.content,
            img: notice.img,
            updatedAt: moment(notice.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        }));

        res.json({ notices: notices2});
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
    }
});

module.exports = router;