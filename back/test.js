const jwt = require("jsonwebtoken");

// // jwt sign 이라는 메소드를 사용하면 jwt 생성 가능
// const token = jwt.sign(
//         //{ key: value }, // payload 정의, 회원의 userIdx 등 회원과 관련된 정보 들어간다. id,pw 같은 민감한 데이터를 넣지 않는다. 다시 디코딩하면 볼 수 있는 값이기 때문에 크리티컬한 값을 넣지 않는다.
//         { userIdx: 1 },
//         "a123" // 서버 비밀키, 서버만 알고 있는 값이여야 해서 따로 git이나 이런 곳에 올리지 않는다. 기본적으로 문자열값. 아무렇게나해줘도 된다.(우리만 알고 있기 떄문에)
//       );

// console.log(token);

// ===================================================================
// jwt sign 이라는 메소드를 사용하면 jwt 생성 가능
const token = jwt.sign(
    { userIdx: 1 },
    "a123"
  );

console.log(token);

// jwt 검증
// 첫번째 인자 검증할 token
// 두번쨰 인자 서버가 가지고 있는 secret 키(서버 비밀키)
// const verifiedToken = jwt.verify(token, secret_config.jwtsecret);
const verifiedToken = jwt.verify(token, "a123");
console.log(verifiedToken);