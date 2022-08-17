// 라이브러리 가져오기
const jwt = require("jsonwebtoken");
// secret.js 파일 만들어준다 jwtSecret 참고하여
const { jwtSecret } = require("./secret");

// 하나의 함수
// router에서 불리는 콜백함수
// next() -> 다음 콜백 함수를 호출하는 것
exports.jwtMiddleware = async function (req, res, next) {
  // 헤더에서 토큰 꺼내기
  const token = req.headers["x-access-token"];

  // 토큰이 없는 경우
  if (!token) {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "로그인이 되어 있지 않습니다.",
    });
  }

  // 토큰이 있는 경우, 토큰 검증
  try {
    const verifiedToken = jwt.verify(token, jwtSecret);
    // verifiedToken = { userIdx: 2, iat: 1660483546 } (payload)
    // console.log(verifiedToken);
    req.verifiedToken = verifiedToken;
    next();
  } catch {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "토큰 검증 실패",
    });
  }
};