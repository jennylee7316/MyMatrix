const {pool} = require("../../database");

// DB요청, API 요청은 비동기적으로 이루어진다.
// async(비동기 처리) = 자바스크립트 비동기처리 강의 듣기
// mysql 접근하기 위한 일종의 양식
exports.getUserRows = async function() {
    // 비동기 처 리함수에서는 에러처리를 try-catch 처리한다
    try {
        //pool 객체를 통해서 데이터베이스에 접근이 잘 되는지 테스트 해보겠다
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectUserQuery = "SELECT * FROM Users;";

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(selectUserQuery);

            return row;
        } catch (err) {
            console.error(` ##### getUserRows Query error #####`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### getUserRows DB error #####`);
        return false;
    }
};

exports.insertTodo = async function (userIdx, contents, type) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            // 쿼리
            const insertTodoQuery = "insert into Todos (userIdx, contents, type) values (?, ?, ?);";
            // ?에 들어갈 변수들을 다시한번 정의
            const insertTodoParams = [userIdx, contents, type]

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(insertTodoQuery,insertTodoParams);

            return row;
        } catch (err) {
            console.error(` ##### insertTodo Query error ##### \n ${err}`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### insertTodo DB error ##### \n ${err}`);
        return false;
    }
};

exports.selectTodoByType = async function (userIdx, type) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            // 쿼리
            // status A : 활성 상태, C: 완료 상태, D: 삭제 상태
            const selectTodoByTypeQuery = "select todoIdx, contents, status from Todos where userIdx = ? and type = ? and not(status='D');";
            // ?에 들어갈 변수들을 다시한번 정의
            const selectTodoByTypeParams = [userIdx, type];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(selectTodoByTypeQuery,selectTodoByTypeParams);

            return row;
        } catch (err) {
            console.error(` ##### selectTodoByType Query error ##### \n ${err}`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### selectTodoByType DB error ##### \n ${err}`);
        return false;
    }
};

// userIdx, todoIdx 유효성 검사
exports.selectValidTodo = async function(userIdx, todoIdx) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            // 쿼리
            // status A : 활성 상태, C: 완료 상태, D: 삭제 상태
            const selectValidTodoQuery = "select * from Todos where userIdx = ? and todoIdx = ? and not(status = 'D');";
            // ?에 들어갈 변수들을 다시한번 정의
            const selectValidTodoParams = [userIdx, todoIdx];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(selectValidTodoQuery,selectValidTodoParams);

            return row;
        } catch (err) {
            console.error(` ##### selectValidTodo Query error ##### \n ${err}`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### selectValidTodo DB error ##### \n ${err}`);
        return false;
    }
};

exports.updateTodo = async function(userIdx, todoIdx, contents, status) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            // 쿼리
            // status A : 활성 상태, C: 완료 상태, D: 삭제 상태
            const updateTodoQuery = "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
            // ?에 들어갈 변수들을 다시한번 정의
            const updateTodoParams = [contents, status, userIdx, todoIdx];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(updateTodoQuery,updateTodoParams);

            return row;
        } catch (err) {
            console.error(` ##### updateTodoQuery Query error ##### \n ${err}`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### updateTodoQuery DB error ##### \n ${err}`);
        return false;
    }
};

exports.deleteTodo = async function(userIdx, todoIdx) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            // 쿼리
            // status A : 활성 상태, C: 완료 상태, D: 삭제 상태
            const deleteTodoQuery = "update Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
            // ?에 들어갈 변수들을 다시한번 정의
            const deleteTodoParams = [userIdx, todoIdx];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(deleteTodoQuery,deleteTodoParams);

            return row;
        } catch (err) {
            console.error(` ##### deleteTodo Query error ##### \n ${err}`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### deleteTodo DB error ##### \n ${err}`);
        return false;
    }
}
