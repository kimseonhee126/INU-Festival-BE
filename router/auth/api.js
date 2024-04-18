const express = require("express");
const router = express.Router();
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

// JSON 미들웨어 사용
router.use(express.json());

router.post("/", async (req, res) => {
    const { studentId, password } = req.body;
    try {
        const apiData = await getData(studentId, password);

        if (apiData.undergraduate) { // 재학생인 경우 토큰발급(uuid)
            const myUUID = uuidv4();
            res.json({ rememberMeToken: myUUID });  // 토큰을 응답으로 보냄
        } else {
            res.status(401).json({ message: '재학생이 아님' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Api 통신 함수(getData)로 안넘어감' });
    }
});

async function getData(studentId, password) {
    try {
        // Axios 인스턴스 생성 및 Basic Auth 설정
        const response = await axios.get('https://api.inuappcenter.kr/account/status', {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${studentId}:${password}`).toString('base64')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', 'api에 학번이나 비번을 잘 못 입력함. or Api에 연결안됨.');
        return { undergraduate: false };
    }
}

module.exports = router;
