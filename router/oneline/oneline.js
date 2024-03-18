const express = require('express');
const router = express.Router();
const db = require('../../models');
const fs = require('fs')

// JSON 미들웨어 사용
router.use(express.json());

router.use(express.urlencoded({ extended: false }));

const { OneLine } = db;     // db.OneLine
const { User } = db;     // db.User

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

// 채팅 메시지 불러오기
router.get('/all_messages', async (req, res) => {
  const ALLOnelines = await OneLine.findAll({
    attributes: ['id', 'content', 'emoji', 'userId'],
  });

  const Onelines = await Promise.all(ALLOnelines.map(async (oneline) => {
    const user = await User.findOne({ where: { id: oneline.userId } });
    return {
      ...oneline.get({ plain: true }),
      studentId: user.studentId,
      content: oneline.content,
      emoji: oneline.emoji
    };
  }));
  res.send(Onelines);
});

// 채팅 메시지 추가(DB에 저장 하고 보내기)
router.post("/add", async (req, res) => {
  const token = req.headers['authorization'];
  console.log('token:토큰은', token);
  const tokenValue = token ? token.split(' ')[1] : null;
  // 토큰으로 유저 찾기
  const existUser = await User.findOne({ where: { token: tokenValue } });
  if (!existUser) { // 로그인을 하지 않은 경우
      return res.status(400).send({ success: false, message: '로그인 먼저 하세요!' });
  } else {
    console.log(req.body)
    const { content, emoji } = req.body;
    const newOneLine = await OneLine.create({
      content: content,
      emoji: emoji,
      userId: existUser.id
    });

    const data = {
      studentId: existUser.studentId,
      content: newOneLine.content,
      emoji: newOneLine.emoji
    }
    res.status(201).json(data);
  }
});

module.exports = router;