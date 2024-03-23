const express = require('express');
const mecab = require('mecab-ya');
const router = express.Router();
const db = require('../../models');

const { Keywords } = db;     // db.Keyword

/* 
메인 페이지 - 한 줄 외치기
    # 키워드
*/

// 임의의 데이터
const sentences = [
    '나는 고양이를 좋아합니다.',
    '오늘은 날씨가 좋네요.',
    '이것은 테스트 문장입니다.',
    '커피를 마시면 기분이 좋아집니다.',
    '바다가 보고 싶어요.',
    '나는 Node.js를 배우고 있습니다.',
    '오늘은 무엇을 먹을까요?',
    '햇살이 따뜻하네요.',
    '책을 읽으면 많은 것을 배울 수 있어요.',
    '나는 새로운 언어를 배우고 싶습니다.',
    '여행을 가면 마음이 행복해집니다.',
    '피곤할 때는 잠을 자는 것이 좋아요.',
    '나는 친구들과 함께 시간을 보내는 것을 즐깁니다.',
    '음악을 듣는 것은 마음의 힐링이 됩니다.',
    '운동을 하면 몸이 건강해집니다.',
    '요리를 하면 맛있는 음식을 먹을 수 있어요.',
    '집에서 영화를 보는 것이 편안합니다.',
    '문제를 해결하는 것은 머리를 깊게 생각하는 기회입니다.',
    '꽃을 보면 마음이 환해집니다.',
    '나는 새로운 경험을 하는 것을 좋아합니다.'
];

// keyword 추출하기
function extractKeyword(sentences) {
    return new Promise((resolve, reject) => {
        let filteredObject = {};
        let filteredResult = sentences.map(sentence => {
            return new Promise((resolve, reject) => {
                mecab.pos(sentence, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        let eachResult = result
                            .filter(([word, pos]) => pos == 'NNG')
                            .map(([word, pos]) => word);
                        filteredObject[sentence] = eachResult;
                        resolve();
                    }
                });
            });
        });

        Promise.all(filteredResult)
            .then(() => {
                resolve(filteredObject);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 30분 주기로 keyword 값 변경하기
const interval = 20 * 1000;

let cacheKeyword = null;

async function updateKeywords() {
    try {
        //
        const mecabKeyword = await extractKeyword(sentences);
        cacheKeyword = mecabKeyword;
    } catch (err) {
        console.error("키워드가 업데이트 되지 않았습니다 :", err);
    }
}

updateKeywords();

// 일정 주기로 키워드 업데이트
setInterval(updateKeywords, interval)

// 
router.get('/', async (req, res) => {
    try {

        if (cacheKeyword) {
            let keywords = [];
            Object.keys(cacheKeyword).forEach((sentence, index) => {
                const id = index + 1;
                const keywordList = cacheKeyword[sentence];
                keywordList.forEach(keyword => {
                    keywords.push({ id, keyword });
                });
            });

            console.log(`keywords : ${JSON.stringify(keywords)}`);

            res.json({ keywords });
        } else {
            res.status(500).json({ error: '키워드가 없습니다...' });
        }

        // const mecabKeyword = await extractKeyword(sentences);

        // let keywords = [];

        // Object.keys(mecabKeyword).forEach((sentence, index) => {
        //     const id = index + 1;
        //     const keywordList = mecabKeyword[sentence];
        //     keywordList.forEach(keyword => {
        //         keywords.push({ id, keyword });
        //     });
        // });

        // console.log(`keywords : ${JSON.stringify(keywords)}`);

        // res.json({ keywords });
    } catch (err) {
        console.error(`error : ${err}`);
        res.status(500).json({ err });
    }
});


module.exports = router;