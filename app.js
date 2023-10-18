const express = require('express');
const app = express();
const db = require('./models/index.js');
const { Perform } = db;

// main 화면
app.get('/', async(req, res) => {
    res.send('status 200 Ok');
});

// 전체 공연 정보
app.get('/perform', async(req, res) => {
    const performs = await Perform.findAll();
    res.send(performs);
});

// 재학생 공연 정보
app.get('/perform/student', async(req, res) => {
    // const { student } = req.query;
    const studentPerform = await Perform.findAll({ where: { category: '동아리' }});
    res.send(studentPerform)
});

// 연예인 공연 정보
app.get('/perform/celeb', async(req, res) => {
    // const { student } = req.query;
    const studentPerform = await Perform.findAll({ where: { category: '연예인' }});
    res.send(studentPerform)
});

// server open
app.listen(5000, async(req, res) => {
    console.log('5000 server is running');
});