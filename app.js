const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
const { Perform } = db;
const { Booth } = db; //db.Booth
const { BoothDay } = db; //db.BoothDay

// main 화면
app.get('/', async(req, res) => {
    res.send('status 200 Ok');
});

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));
app.use(cors());

// 전체 공연 정보
app.get('/perform', async(req, res) => {
    const performs = await Perform.findAll();
    res.send(performs);
});

// 인트로 페이지
app.get('/', async (req, res) => {
    res.send('희희낙낙 홈');
});

/* --------------------------------------------------------------------------------------------------------
메인 화면에 있는 동작 작성
1. 오늘의 라인업
2. 한 줄 외치기
3. 부스 랭킹 Top 5
-----------------------------------------------------------------------------------------------------------
*/

// 메인페이지 - 오늘의 라인업
app.get('/lineup', async(req, res) => {
    
    try {
        const celebPerform = await Perform.findAll({
            where: { category : '연예인' },
            attributes: ['id', 'name', 'date', 'day', 'time', 'category', 'detail', 'img'],
        });
    
        res.send(celebPerform);
      }
      catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
      }
});

// 메인페이지 - 부스 랭킹 Top 5
app.get('/ranking', async (req, res) => {
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

// 메인 페이지 - 한 줄 외치기 
// 코드 없습니다

/* --------------------------------------------------------------------------------------------------------
지도에 있는 동작 작성

-----------------------------------------------------------------------------------------------------------
*/


/* --------------------------------------------------------------------------------------------------------
타임 테이블에 있는 동작 작성
1. 타임 테이블 - 오늘의 라인업
2. 타임 테이블 - 전체 공연 정보
-----------------------------------------------------------------------------------------------------------
*/

// 타임 테이블 - 전체 공연 정보
app.get('/perform', async(req, res) => {
    
    try {
        const studentPerform = await Perform.findAll({
            attributes: ['id', 'name', 'date', 'day', 'time', 'category', 'detail', 'img'],
        });
    
        res.send(studentPerform);
      }
      catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        res.status(500).json({ error: '데이터를 불러올 수 없습니다.' });
      }
});

// Running the Server: 포트번호는 5000
app.listen(5000, async(req, res) => {
    console.log('5000 server is running');
});