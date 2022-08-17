const indexController = require("../controller/indexController");
const { jwtMiddleware } = require("../../jwtMiddleware");

// 라우터 부분만 정의 되도록 만들 것
// exports node 시스템으로 사용할 수 있다
// - 나 여기 있는 함수를 밖에서 꺼내다 사용할 수 있어 선언한 상태
// - index.js에서 const {indexRouter} = require("./src/router/indexRouter"); 정의하면 
// - index.js에서 여기에 정의한 것을 꺼내다 사용 가능
// indexRouter이름으로 함수를 하나 export 할것
// express app 이라는 객체를 받는 것으로 함

exports.indexRouter = function(app) {
    // 일정 CRUD API
    // jwtMiddleware 중간에 추가 next()역할로 다음 콜백함수를 부르기 때문에 jwt 검사 후 컨트롤러 진입
    app.post("/todo", jwtMiddleware ,indexController.createTodo); // create
    app.get("/todos", jwtMiddleware,indexController.readTodo); // read /user/1/todos
    app.patch("/todo", jwtMiddleware, indexController.updateTodo); // update
    app.delete("/todo/:todoIdx", jwtMiddleware, indexController.deleteTodo) // delete body값을 안 쓰는게 rest의 원칙, 쿼리스트링이나 경로변수 사용, /user/1/todo/1 1번 유저가 1번 todo를 삭제할 것이다




    //연습
    // app.get("/users/:userIdx", indexController.getUsers); // 유저 목록 조회 API
    // app.post("/user", indexController.postLogic);

    // next() 예제
    app.get("/dummy", function(req, res, next) {
        console.log(1);
        next();
    },
    function (req, res, next) {
        console.log(2);
        // next();
    },
    function (req, res, next) {
        console.log(3);
        return;
    }
    );
};
