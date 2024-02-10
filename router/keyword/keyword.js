const express = require('express');
const router = express.Router();
const db = require('../../models');

const { Keywords } = db;     // db.Keyword

/* 
메인 페이지 - 한 줄 외치기
    # 키워드
*/
router.get('/', async(req, res) => {
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

module.exports = router;