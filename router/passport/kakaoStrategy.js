const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const User = require('../../models').User;
// .env 파일 사용하기 위해
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_URL,

        // 카카오에서 인증 후, callbackURL에 적힌 주소로 accessToken, refreshToken, profile 을 보냅니다
        // profile에는 사용자의 정보가 들어있습니다
    }, async(accessToken, refreshToken, profile, done) => {
        // console 창에 프로필 뜨는지 확인
        console.log('accessToken : ', accessToken);
        // console.log('kakao profile: ', profile);

        // 기존에 카카오를 통해 회원가입 한 적 있는지 조회
        try {
            // 이미 회원가입 되어 있다면 사용자 정보와 함께 done() 호출하고 종료
            const existUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' },
            });

            // console.log('findOne User : ', existUser);
            // console.log("findOne User's id : ", existUser?.snsId);

            if (existUser) {
                done(null, existUser);
            }
            // 기존에 회원가입 한 적 없다면 회원가입 진행
            else {
                const newUser = await User.create({
                    nick: profile.displayName,
                    snsId: profile.id,
                    token: accessToken,
                    // email: profile._json?.kakao_account?.email,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        }
        catch(err) {
            console.error(err);
            done(err);
        }
    }));
};