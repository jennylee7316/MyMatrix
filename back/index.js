const compression = require("compression");
const cors = require("cors");
// - index.js에서 const {indexRouter} = require("./src/router/indexRouter"); 정의하면 
// - index.js에서 여기에 정의한 것을 꺼내다 사용 가능
const {indexRouter} = require("./src/router/indexRouter");
const {userRouter} = require("./src/router/userRouter");

const express = require("express");
const app = express()
const port = 3000

/* express 미들웨어 설정 */

// 정적파일 제공
app.use(express.static("front"));

// cors 설정
// 허가된 애들만 이 api를 사용하게 할꺼야
// 웹브라우저에서 도메인이 다르면 요청을 하지 못하게 한다
// 그런것들 상관없이 모두에게 개방하게 하겠다
// 보안설정을 느슨하게 해 준 것이다,
app.use(cors());

// body json 파싱 미들웨어
// 클라이언트에 대해서 데이터 패킷이 날라오면 거기서 body를 찾아내어 json값을 파싱
app.use(express.json());

// HTTP요청 압축
// 클라이언트와 서버가 통신할 때 HTTP 압축하면 주고 받으면 더 효율적
// compression 라이브러리를 불러오기 위해서 아래 코드를 맨 위에 추가 해서 불러올 수 있는 것!!!
// const compression = require('compression');
app.use(compression());
// ======== 미들웨어 끝

// 라우팅 받아서 하는 것
// api 요청 방법
// app.요청하고 싶은 메소드 입력(get, post 등)
// 첫번쨰 인자 (어떤 URI로 받을 것인가)
// 두번째 인자 어떤 로직을 수행할 것이냐 callback 함수 설정
// callback 함수는 2개의 인자(req,res)를 받는다
// req = 클라이언트에서 서버로 요청해오는 것과 관련된 객체
// res = 서버가 클라이언트한테 응답을 해줄 때 관련된 객체

// app.get("/users", function(req, res){
//     return res.send("hello");
// });

// app.post("/users", function(req, res){
//     const name = req.body.name;
//     return res.send(name);
// });

// 라우터 분리
// app은 위에 express객체를 전달 해 주는 것
indexRouter(app);
userRouter(app);

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`)
})