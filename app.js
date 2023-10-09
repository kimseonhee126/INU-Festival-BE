const express = require('express');
const app = express();
const sequelize = require('sequelize');

// 미들웨어 사용
app.use(express.json());

// // 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
// app.use('/img', express.static('public/img'));

// 인트로 페이지
app.get('/', async (req, res) => {
    res.send('희희낙낙 홈');
});

// Running the Server: 포트번호는 5000
app.listen(3000, () => {
    console.log('Server is running on 3000');
});