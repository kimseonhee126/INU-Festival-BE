const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const db = require('../../models');

// .env 파일 사용하기 위해
dotenv.config();

const { User } = db;
const { Booth } = db;

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
    // console.log(req.headers)
    // 토큰 받기
    const token = req.headers["authorization"];
    // console.log(`토큰: ${token}`);
    const tokenValue = token ? token.split(" ")[1] : null;
    // console.log(`토큰값: ${tokenValue}`);

    // 해당 토큰을 가지고 있는 user 찾기
    const findUser = await User.findOne({ where: { token: tokenValue } });
    // console.log(`유저: ${findUser.studentId}`);
    const booth = await Booth.findOne({ where: { id: findUser.rank }});
    console.log(`부스: ${booth.name}`);

    res.json({ success: true, booth: booth });

  } catch(err) {
    res.json({ success: false, message: "서버 내부 오류"  });
  }
});

router.get('/detail', function(req, res){
  res.render('detail');
});
router.post('/detail', upload.single('public/img'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : '+req.file.filename);
});

module.exports = router;
