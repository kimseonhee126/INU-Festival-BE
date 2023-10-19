const express = require('express');
const app = express();
const sequelize = require('sequelize');
const db = require('./models');
const { Perform } = db;

// main 화면
app.get('/', async(req, res) => {
    res.send('status 200 Ok');
});

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));
// 전체 공연 정보
app.get('/perform', async(req, res) => {
    const performs = await Perform.findAll();
    res.send(performs);
});

const { Booth } = db; //db.Booth
const { BoothDay } = db; //db.BoothDay

// 인트로 페이지
app.get('/', async (req, res) => {
    res.send('희희낙낙 홈');
});

// 재학생 공연 정보
app.get('/perform/student', async(req, res) => {
    // const { student } = req.query;
    const studentPerform = await Perform.findAll({ where: { category: '동아리' }});
});

// 연예인 공연 정보
app.get('/perform/celeb', async(req, res) => {
    // const { student } = req.query;
    const studentPerform = await Perform.findAll({ where: { category: '연예인' }});
    res.send(studentPerform)
});

app.get('/booths', async (req, res) => {
    try {
        const allBooths = await Booth.findAll();
        
        const filteredBooths = [];

        for (let i = 0; i < allBooths.length; i++) {
            const boothId = allBooths[i].id;

            const myBoothDays = await BoothDay.findAll({
                where: { boothId: boothId },
            });

            const selectedKeys = ['id', 'day', 'time'];

            const filteredBoothDays = myBoothDays.map((item) => {
                const selectedObject = {};
                selectedKeys.forEach((key) => {
                    selectedObject[key] = item[key];
                });
                return selectedObject;
            });

            const selectedKeys2 = ['id', 'name', 'category', 'department', 'description', 'liked'];

            const selectedObject2 = {};
            selectedKeys2.forEach((key) => {
                selectedObject2[key] = allBooths[i][key];
            });

            selectedObject2.boothDays = filteredBoothDays;
            filteredBooths[i] = selectedObject2;
        }
        res.send({ booths: filteredBooths });
    } catch (err) {
        console.error('ERROR: ', err);
    }
});

// Running the Server: 포트번호는 5000
app.listen(5000, async(req, res) => {
    console.log('5000 server is running');
});