const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

// .env 파일 사용하기 위해
dotenv.config();

// JSON 미들웨어 사용
router.use(express.json());

async function authenticateUser(studentId, password) {
    const authHeader = `Basic ${btoa(`${studentId}:${password}`)}`;

    try {
        const response = await axios.post('https://api.inuappcenter.kr/account/status', {}, {
            headers: {
                Authorization: authHeader
            }
        });
        return response.data;
    } catch (error) {
        console.error('Authentication failed:', error);
        throw error;
    }
}

router.post("/", async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const userData = await authenticateUser(studentId, password);
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
});


