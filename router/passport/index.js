const passport = require('passport');
const kakao = require('./kakaoStrategy');
const User = require('../../models').User;

module.exports = () => {
    // 로그인 할 때 사용하는 .serializeUser
    passport.serializeUser((user, done) => {
        // 첫 번째 인수는 에러가 발생힐 떼 사용
        // 두 번째 인수는 저장하고 싶은 정보 -> deserializeUser의 매개변수
        done(null, user.id);
    });

    // 각 요청마다 실행
    // db에 저장된 User의 정보 불러옴
    passport.deserializeUser((id, done) => {
        User.findOne({where: {id}})
        .then(user => done(null, user))
        .catch(err => done(err));
    });
    kakao();
};