const express = require("express");
const router = express.Router();
const passport = require('passport');

// http://localhost:4000/auth/kakao
// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// JSON 미들웨어 사용
router.use(express.json());

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
}), (req, res) => {
    // 필요한 내용만 프론트에 전달
    req.session.user = {
        snsId: req.user.snsId,
        nick: req.user.nick,
        token: req.user.token,
    };
    const accessToken = req.user.token;

    console.log(`새로운 카카오 유저 생성 : ${req.user.nick}, ${accessToken}`);
    // 프론트로 json 데이터 보내기
    res.status(200).json({ accessToken });
});

module.exports = router;