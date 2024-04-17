const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

// .env 파일 사용하기 위해
dotenv.config();

// JSON 미들웨어 사용
router.use(express.json());

router.post("/", async (req, res) => {
    const { studentId, password } = req.body;
    console.log('진입1');
    try {
        const userData = await getData(studentId, password);
        console.log(userData);
        // console.log('진입2');
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json({ message: 'Api 문제' });
    }
});

async function getData(studentId, password) {
    try {
        // Axios 인스턴스 생성 및 Basic Auth 설정
        console.log('진입2');
        const response = await axios.get('https://api.inuappcenter.kr/account/status', {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${studentId}:${password}`).toString('base64')}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = router;
