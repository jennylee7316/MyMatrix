const indexDao = require("../dao/indexDao");

// async 비동기 처리할 수 있게 선언
// Todo 생성
exports.createTodo = async function (req, res) {
    // jwtMiddleware.js에서 req.verifiedToken으로 넣어줬기 때문에 접근 가능
    // req.verifiedToken은 { userIdx: 2, iat: 1660483546 } 저장되어 있음
    const {userIdx} = req.verifiedToken;
    
    const { contents, type } = req.body;

    // validation 검사
    if(!userIdx || !contents || !type) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값이 누락됐습니다."
        });
    }

    // contents 20글자 초과 불가
    if(contents.length > 20) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "컨텐츠는 20글자 이하로 설정해주세요."
        });
    }
    

    // type : do, decide, delete, delegate
    const validTypes = ["do", "decide", "delete", "delegate"];
    
    if(!validTypes.includes(type)) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 타입이 아닙니다."
        });
    }

    const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);

    // insertTodoRow false로 반환할 경우
    if (!insertTodoRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "유청에 실패했습니다. 관리자에게 문의해주세요."
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "일정 생성 성공"
    });

    // console.log(insertTodoRow);
};

// Todo 조회
exports.readTodo = async function (req, res) {
    // router에 있는 경로 변수 일름 일치 해야한다 (:userIdx)
    // const { userIdx } = req.params;

    // token 추가 ver
    const { userIdx } = req.verifiedToken;

    const todos = {};

    const types = ["do", "decide", "delete", "delegate"];

    for (let type of types) {
        // const로 하면 재할당이 안된다
        // for문에서 selectTodoByTypeRows 은 재할당이 되어야 해서 let으로 선언
        let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);

        // false로 반환 되면
        if (!selectTodoByTypeRows) {
            return res.send({
                isSuccess: false,
                code: 400,
                message: "일정 조회 실패. 관리자에게 문의해주세요."
            });
        }

        todos[type] = selectTodoByTypeRows;
    }

    // json 형태로 보내기 위해 send() 안에 {} 해준다
    return res.send({
        result: todos,
        isSuccess: true,
        code: 200,
        message: "일정 조회 성공"
    });
}

// Todo 수정
exports.updateTodo = async function (req, res) {
    const { userIdx } = req.verifiedToken;
    let { todoIdx, contents, status } = req.body;

    // userIdx, todoIdx 필수
    if (!userIdx || !todoIdx) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "userIdx와 todoIdx를 보내주세요."
        });
    }

    // contents, status 옵션
    if (!contents) {
        contents = null;
    }

    if (!status) {
        status = null;
    }

    // userIdx와 todoIdx 유효성 검사
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);

    if (isValidTodoRow.length < 1) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요."
        });
    }

    const updateTodoRow = await indexDao.updateTodo(userIdx, todoIdx, contents, status);

    if(!updateTodoRow) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "수정 실패. 관리자에게 문의해주세요."
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "수정 성공"
    });
};

// todo 삭제
exports.deleteTodo = async function (req, res) {
    const { userIdx } = req.verifiedToken;
    const { todoIdx } = req.params;

    if (!userIdx || !todoIdx) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "userIdx, todoIdx를 입력해주세요."
        });
    }

    // userIdx와 todoIdx 유효성 검사
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    if (isValidTodoRow.length < 1) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요."
        });
    }

    const deleteTodoRow = await indexDao.deleteTodo(userIdx, todoIdx);

    // deleteTodoRow false이면
    if(!deleteTodoRow) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "삭제 실패. 관라자에게 문의해주세요."
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "삭제 성공"
    });

};

// 연습
// exports.postLogic = function(req, res) {
//     const {nickname, gender, address} = req.body;
//     console.log(nickname, gender, address);
//     return res.send(nickname);
// };

// // async 비동기화
// exports.getUsers = async function(req, res) {
//     const token = req.headers["x-access-token"];
//     console.log(token);

//     return res.send({
//         result: "",
//         isSuccess: true,
//         code: 200,
//         message: "유저 목록 조회 성공"
//     })



//     // 로직
//     // 데이터베이스 접근 등 과 관련된 것들은 항상 비동기화 하는 것은 await 를 작성해줘야한다
//     // const getUserRows = await indexDao.getUserRows();

//     // return res.send(getUserRows);
// }