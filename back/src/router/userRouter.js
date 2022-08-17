const userController = require("../controller/userController");
const  {jwtMiddleware } = require("../../jwtMiddleware");

exports.userRouter = function(app) {
    // 회원가입 API
    app.post("/user", userController.signup);

    // 로그인 API
    // 토큰을 생성하는게 로그인의 목적이기 때문에 생성하는 행위 때문에 post로
    app.post("/sign-in", userController.signin);

    // jwt 검증 API
    app.get("/jwt", jwtMiddleware, userController.getNicknameByToken);
};