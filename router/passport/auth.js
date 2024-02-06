const express = require("express");
const router = express.Router();
const passport = require('passport');

// http://localhost:4000/auth/kakao
// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

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

    // redirect로 보내기
    res.redirect('/');
});

module.exports = router;