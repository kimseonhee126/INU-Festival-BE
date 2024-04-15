const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const db = require('../../models');

// .env 파일 사용하기 위해
dotenv.config();

const moment = require("moment");
moment.tz.setDefault('Asia/Seoul'); // 로컬 시간대 설정

const { realDays } = require('../../app');

const { User } = db;
const { Booth } = db;
const { BoothDay } = db;    //db.BoothDay
const { BoothImg } = db;   //db.Booth
const { Comment } = db;   //db.Comment

const fs = require('fs')

const multer = require('multer');

const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '').toLowerCase();
    const nameWithDate = `${formattedDate}-${safeName}`;
    cb(null, nameWithDate);
  }
})
const upload = multer({ storage: _storage })

// JSON 미들웨어 사용
router.use(express.json());

router.use(express.urlencoded({ extended: false }));

// 로그인 페이지
router.get("/", async (req, res) => {
  res.render('login');
});

// 리스트 페이지
router.get('/list', async (req, res) => { 
  try{
    // 토큰 받기
    const token = req.headers["authorization"];
    const tokenValue = token ? token.split(" ")[1] : null;
    // 해당 토큰을 가지고 있는 user 찾기
    const findUser = await User.findOne({ where: { token: tokenValue } });
    const booth = await Booth.findOne({ where: { id: findUser.rank }});
    console.log(`부스: ${booth.name}`);

    res.json({ success: true, booth: booth });

  } catch(err) {
    res.json({ success: false, message: "서버 내부 오류"  });
  }
});

router.get('/edit', (req, res) => {
  res.render('detail');
});

router.get('/detail', async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const tokenValue = token ? token.split(" ")[1] : null;
    const findUser = await User.findOne({ where: { token: tokenValue } });

    if (!findUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Assume findUser.rank corresponds to boothId
    const boothId = findUser.rank;
    const booth = await Booth.findOne({
      where: { id: boothId },
      attributes: ['id', 'name', 'category', 'department', 'description', 'liked'],
    });

    if (!booth) {
      return res.status(404).json({ success: false, message: "Booth not found" });
    }

    const myBoothDays = await BoothDay.findAll({
      where: { boothId: boothId },
      attributes: ['id', 'day', 'time', 'location', 'x', 'y'],
    });

    const myBoothImgs = await BoothImg.findAll({
      where: { boothId: boothId },
      attributes: ['id', 'url'],
  });

  const myBoothComments = await Comment.findAll({
      where: { boothId: boothId },
  });

  const myBoothComments2 = myBoothComments.map(comment => ({
      id: String(comment.id),
      content: comment.content,
      createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: moment(comment.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  }));

  // 변환 로직 추가: boothDay의 day 숫자를 요일 문자열로 변환
  const boothDaysWithRealDay = myBoothDays.map(boothDay => {
      const dayIndex = boothDay.day - 1; // 배열 인덱스를 위해 1 감소
      return {
          ...boothDay.get({ plain: true }),
          day: realDays[dayIndex], // 숫자를 실제 요일로 변환
      };
  });

  const boothResponse = {
      ...booth.get({ plain: true }),
      boothDays: boothDaysWithRealDay,
      boothImgs: myBoothImgs.map(img => img.get({ plain: true })),
      boothComments: myBoothComments2,
  };
  console.log(boothResponse);
  res.send({ booth: boothResponse });
} catch (err) {
  console.error('ERROR: ', err);
  res.status(500).send({ message: 'Server error' }); // 에러 응답 추가
}
});


// router.post('/detail', upload.array('imgs', 10), async (req, res) => {
//   console.log(req.body);
//   try{
//     // 토큰 받기
//     const token = req.headers["authorization"];
//     const tokenValue = token ? token.split(" ")[1] : null;
//     // 해당 토큰을 가지고 있는 user 찾기
//     const findUser = await User.findOne({ where: { token: tokenValue } });
//     const booth = await Booth.findOne({ where: { id: findUser.rank }});

//     // const boothImgs = await BoothImg.findAll({
//     //   where: { boothId: booth.id },
//     // });

//     // await booth.update({
//     //   ...req.body,
//     //   updatedAt: new Date(),
//     // });

//     // await BoothImg.update({
//     //   img: req.file.filename,
//     // });

//     // console.log(`부스: ${booth.name}`);
//     console.log(req.files);
//     // console.log(`경로 : ${req.file.path}`);
//     console.log(req.body);

//     res.json({ success: true, booth: booth });

//   } catch(err) {
//     res.json({ success: false, message: "서버 내부 오류"  });
//   }
// });

// 이미지 파일을 받아 처리하는 라우트
router.post('/detail', upload.array('imgs', 10), async (req, res) => {
  console.log(req.files); // 업로드된 파일 정보 로깅
  // 이후 로직에 따라 데이터베이스 업데이트 및 기타 처리
  res.json({ success: true, message: "이미지가 업로드되었습니다." });
});

module.exports = router;
