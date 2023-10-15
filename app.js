const express = require('express');
const app = express();
const sequelize = require('sequelize');
const db = require('./models');

// 미들웨어 사용
app.use(express.json());

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));

const { Booth } = db; //db.Booth
const { BoothDay } = db; //db.BoothDay

// 인트로 페이지
app.get('/', async (req, res) => {
    res.send('희희낙낙 홈');
});

app.get('/booths', async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            // http://localhost:3000/booths?name=총학부스
            const boothOfName = await Booth.findAll({
                where: { name },
            });
            res.send(boothOfName);
        } else {

            const selectedKeys = ['id', 'day', 'time'];
            const selectedKeys2 = ['id', 'name', 'boothDays'];

            const selectedData = myBoothDays.map((item) => {
                const selectedObject = {};
                selectedKeys.forEach((key) => {
                    selectedObject[key] = item[key];
                });
                return selectedObject;
            });

            var allBooths = await Booth.findAll();

            const selectedData2 = allBooths.map((item) => {
                const selectedObject2 = {};
                selectedKeys2.forEach((key) => {
                    selectedObject2[key] = item[key];
                });
                return selectedObject2;
            });

            for (let i = 0; i < allBooths.length; i++) {
                const boothId = allBooths[i].id;

                var myBoothDays = await BoothDay.findAll({
                    where: { boothId: boothId },
                });
                
                allBooths[i].boothDays = JSON.stringify(selectedData);
                // console.log(allBooths[i].boothDays);
            }

            console.log(JSON.stringify(selectedObject2));
        }
    } catch (err) {
        console.error('ERROR : ', err);
    }
});

// Running the Server: 포트번호는 3000
app.listen(3000, () => {
    console.log('Server is running on 3000');
});


