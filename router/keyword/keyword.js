const express = require('express');
const mecab = require('mecab-ya');
const router = express.Router();
const db = require('../../models');

const { Keywords } = db;     // db.Keyword

/* 
메인 페이지 - 한 줄 외치기
    # 키워드
*/
// router.get('/', async(req, res) => {
//     try {
//         const allKeywords = await Keywords.findAll({
//             attributes: ['id', 'word'],
//         });

//         const someKeywords = allKeywords.slice(0, 10);

//         // id 컬럼, studentID 컬럼을 문자열로 변환 후 response 보내기
//         const keywords = someKeywords.map((keyword) => ({
//             id: String(keyword.id),
//             word: keyword.word,
//         }));

//         res.send({keywords:keywords});
//     }
//     catch (err) {
//         console.log('Error: ', err);
//         res.send('500 error');
//     }
// });

//
async function asyncMecab(text) {
	return new Promise((res, rej) => {
		mecab.pos(text, function (err, result) {
			result?.forEach(value => {
				if (value[1].indexOf('NN'/*명사*/) == 0
					|| value[1] == "SL" || value[1] == "OL"     //외국어
					|| value[1] == "SH" || value[1] == "OH"     //한자
					|| value[1] == "SN" || value[1] == "ON")    //숫자
				{
					if (!mecabResult[value[0]]) mecabResult[value[0]] = 1;
					else mecabResult[value[0]]++;
				}
			});
			res();
		});
	});
}

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
    '나는 새로운 언어를 배우고 싶습니다.'
];

router.get('/', async (req, res) => {
    let result = [];
    try {
        for (let i = 0; i < sentences.length(); i++) {
            console.log(`sentence : ${sentences[i][j]}`);
            result.push(sentences[i][0]);
        }
        res.json(result);
    } catch(err) {
        res.json({ message: 'failed' });
    }

    // mecab.pos("이건 형태소 분석을 위한 테스트용 텍스트입니다.", function (err, result) {
    //     console.log(result);
    // })
});

module.exports = router;