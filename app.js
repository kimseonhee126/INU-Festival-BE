const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sequelize = require('sequelize');
const db = require('./models');
const User = require('./models').User;
/* 설치한 socket.io 모듈 불러오기 */
const socket = require('socket.io');
const http = require('http');

// express 사용하기
const app = express();

const server = http.createServer(app); // Express 앱을 http 서버에 래핑
const io = socket(server, { // http 서버 인스턴스를 socket.io에 전달
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// .env 파일 사용하기 위해
dotenv.config();

const realDays =['화', '수', '목'];
const realDates = ['2024-05-07', '2024-05-08', '2024-05-09']

module.exports = {
  realDays,
  realDates,
};

// 미들웨어 사용 -> Public 폴더를 정적 파일로 제공
app.use('/img', express.static('public/img'));
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

// Cors 미들웨어 사용
app.use(cors());
// Morgan 미들웨어 사용
// app.use(morgan('dev'));

/* ----------------------------- 라우터 분리 ------------------------------ */
const loginRouter = require('./router/auth/login.js');
const timetableRouter = require('./router/perform/perform.js');
const boothRouter = require('./router/booth/booth.js');
const noticeRouter = require('./router/notice/notice.js');
const keywordRouter = require('./router/keyword/keyword.js');
const onelineRouter = require('./router/oneline/oneline.js');
const adminBoothRouter = require('./router/admin/booth.js');

// app.use('/auth', kakaoRouter);                   // 카카오 로그인
app.use('/user', loginRouter);                   // lms 로그인, 로그아웃
app.use('/timetable', timetableRouter);          // timetable 분리
app.use('/booth', boothRouter);                 // booth 분리
app.use('/notice', noticeRouter);               // notice 분리
app.use('/keywords', keywordRouter);             // keyword 분리
app.use('/sentence', onelineRouter);                // oneline 분리
app.use('/admin', adminBoothRouter);             // Booth 관리자 페이지

// 테스트용
app.get('/', async (req, res) => {
  try {
    console.log('루트 페이지~!');
    res.status(200).json({ message: '프론트 친구들 안녕? 힘들때 웃는자가 일류야..!!' });
  } catch(err) {
    console.error('Error : ', err);
    res.status(500).json({ message: '서버 내부 오류' });
  }
});

io.sockets.on('connection', function(socket) {
  /* 전송한 메시지 받기 */
  socket.on('message', function(data) {
    /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
    console.log('message: ' + data);
    socket.broadcast.emit('update', data);
  })

  /* 접속 종료 */
  socket.on('disconnect', function() {
    // console.log('user disconnected');
  })
})

// 요일과 날짜
app.get('/days', (req, res) => {
    res.send({ days: realDays, dates: realDates });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
