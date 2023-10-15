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


// Running the Server: 포트번호는 3000
app.listen(3000, () => {
    console.log('Server is running on 3000');
});


