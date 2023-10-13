const express = require('express');
const app = express();
const sequelize = require('sequelize');
const db = require('./models');

// 미들웨어 사용
app.use(express.json());

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));

const { Booth } = db; //db.Booth

// 인트로 페이지
app.get('/', async (req, res) => {
    res.send('희희낙낙 홈');
});

app.get('/booths', async (req, res) => {
    const { name } = req.query;
    if (name) { // http://localhost:3000/booths?name=총학부스
        const boothOfName = await Booth.findAll({
            where: { name },
        });
        res.send(boothOfName);
    } else {
        const booths = await Booth.findAll();
        res.send(booths);
    }
});

// Running the Server: 포트번호는 3000
app.listen(3000, () => {
    console.log('Server is running on 3000');
});