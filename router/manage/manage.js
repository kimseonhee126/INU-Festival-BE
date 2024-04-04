const express = require("express");
const router = express.Router();
// const db = require('../../models');
const fs = require('fs')

// JSON 미들웨어 사용
// router.use(express.json());

// router.use(express.urlencoded({ extended: false }));

// 이미지 불러오기
router.get("/", async (req, res) => {
  fs.readFile("./static/index.html", function (err, data) {
    if (err) {
      res.send("에러");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

module.exports = router;
