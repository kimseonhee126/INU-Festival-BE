const express = require("express");
const router = express.Router();
const passport = require('passport');

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
}), (req, res) => {
    // 성공시, '/'로 이동..!!
    res.redirect('/');
});

module.exports = router;