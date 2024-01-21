const express = require('express');
const router = express.Router();
const db = require('../../models');

const { OneLine } = db;     // db.OneLine
const { User } = db;        // db.User

/* 
메인 페이지 - 한 줄 외치기
    # 학번, 한 줄, 이모지
*/
router.get('/', async (req, res) => {
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

module.exports = router;