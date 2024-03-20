const express = require("express");
const session = require("express-session");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
const User = require("../../models").User;
// .env 파일 사용하기 위해
dotenv.config();

// JSON 미들웨어 사용
router.use(express.json());

// 자동 로그인기능(토큰으로 학번 가져오기)
router.get("/me", async (req, res) => {
    try {
        // 토큰 받기
        const token = req.headers["authorization"];

        console.log(`token : ${token}`);
        const tokenValue = token ? token.split(" ")[1] : null;

        console.log(`token 값으로 User 찾기 : ${tokenValue}`);
        // 해당 토큰을 가지고 있는 user 찾기
        const findUser = await User.findOne({ where: { token: tokenValue } });

        let id;
        let name;

        if (!findUser) {
            return res.status(403).json({ message: "토큰을 찾을 수 없습니다!" });
        }

        // 세션 넘겨주기 -> LMS
        req.session.user = {
            id: findUser.barcode,
            name: findUser.studentId,
        };

        // 프론트로 response 넘겨주기 -> LMS
        id = findUser.barcode;
        name = findUser.studentId;
        return res.json({ id, name });
    } catch (err) {
        // 에러 출력
        console.error("에러: ", err.message);
        res.status(500).json({ message: "서버 내부 오류" });
    }
});

// request 올라가라..!!
router.post("/lms", async (req, res) => {
    try {
        const { studentId, password } = req.body;
        // 토큰이 없을 수 있으므로..!! null 값일 수 있으므로..!!
        const token = req.headers["authorization"];
        const tokenValue = token ? token.split(" ")[1] : null;

        const existUser1 = await User.findOne({ where: { token: tokenValue } });
        const existUser2 = await User.findOne({ where: { studentId } });
        if (existUser1 && existUser2) { // 토큰도 있고 기존에 등록된 사용자도 있으면
            return res.status(200).json({ accessToken: tokenValue }); // 기존 토큰값을 그대로 반환
        }
        // 기존에 등록된 사용자가 있으면 -> 토큰값만 없는 경우(로그아웃 상태에서 다시 로그인을 시도한 경우) -> 토큰 재발급
        if (existUser2) {
            const response = await axios.post(`${process.env.LMS_URL}`, {
                studentId,
                password,
            });
            const accessToken = response.data.rememberMeToken;
            await User.update({ token: accessToken }, { where: { studentId } }); // 재발급한 토큰저장하기
            return res.status(200).json({ accessToken });
        } else { // 최초 로그인 시도한 경우
            const response = await axios.post(`${process.env.LMS_URL}`, {
                studentId,
                password,
            });
            const accessToken = response.data.rememberMeToken;
            const barcode = response.data.barcode;
            // 유저 생성
            await User.create({
                barcode: barcode,
                token: accessToken,
                studentId: studentId,
                provider: "LMS",
            });
            return res.status(200).json({ accessToken });
        }
    } catch (err) {
        console.error("에러:", err.message);
        // API 요청 실패 또는 다른 에러에 대한 처리
        if (err.response) {
            // API로부터의 응답 에러 처리
            res.status(err.response.status).json({
                success: false,
                message: err.response.data.message || "외부 API 요청 에러",
            });
        } else {
            // 요청을 보내는 중 문제가 발생한 경우
            res.status(500).json({ success: false, message: "서버 내부 오류" });
        }
    }
});

router.get("/logout", async (req, res) => {
    try {
        const token = req.headers["authorization"];
        const tokenValue = token ? token.split(" ")[1] : null;

        if (!tokenValue) {
            return res.status(400).json({
                success: false,
                message: "로그아웃 요청이 올바르지 않습니다.",
            });
        }

        // 먼저 해당 토큰을 가진 사용자를 찾습니다.
        const user = await User.findOne({ where: { token: tokenValue } });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "사용자를 찾을 수 없습니다." });
        }

        // 사용자를 찾았다면, 토큰을 초기화합니다.
        await User.update({ token: "" }, { where: { id: user.id } });

        // 성공적으로 로그아웃 처리가 완료되었음을 클라이언트에 알립니다.
        return res
            .status(200)
            .json({ success: true, message: "성공적으로 로그아웃 되었습니다." });
    } catch (err) {
        console.error("Error : ", err);
        res.status(500).json({
            success: false,
            message: "로그아웃 처리 중 오류가 발생했습니다.",
        });
    }
});

module.exports = router;
