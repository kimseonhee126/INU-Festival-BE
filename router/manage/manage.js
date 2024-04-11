const express = require("express");
const router = express.Router();
// const db = require('../../models');
const fs = require('fs')

const multer = require('multer');

const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '').toLowerCase();
    cb(null, safeName);
  }
})
const upload = multer({ storage: _storage })

// JSON 미들웨어 사용
// router.use(express.json());

// router.use(express.urlencoded({ extended: false }));

// 이미지 불러오기
router.get("/", async (req, res) => {
  fs.readFile("./static/login.html", function (err, data) {
    if (err) {
      res.send("에러");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

router.get('/detail', function(req, res){
  fs.readFile("./static/upload.html", function (err, data) {
    if (err) {
      res.send("에러");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});
router.post('/detail', upload.single('public/img'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : '+req.file.filename);
});

module.exports = router;
