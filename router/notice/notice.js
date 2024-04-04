const express = require('express');
const router = express.Router();
const moment = require("moment");
const db = require('../../models');

const { Notice } = db;      // db.Notice
const { NoticeImg } = db;   // db.NoticeImg

// 공지사항 조회
router.get('/', async (req, res) => {
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
            content: notice.content
                .replace(/^[\r\n]+/, '') // 문자열 시작 부분의 줄바꿈 제거
                .replace(/\s*[\r\n]+\s*/g, '\n') // 문자열 내의 다른 줄바꿈 양쪽 공백을 줄바꿈으로 대체
                .replace(/\s{2,}/g, ''), // 2개 이상 연속된 공백을 제거
            updatedAt: moment(notice.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            noticeImgs: notice.noticeImgs,
        }));

        res.json({ notices: notices3});
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
    }
});

module.exports = router;