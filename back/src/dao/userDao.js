const {pool} = require("../../database");

// user 생성
exports.insertUser = async function(email, password, nickname) {
    try {
        //pool 객체를 통해서 데이터베이스에 접근이 잘 되는지 테스트 해보겠다
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const insertUserQuery = "insert into Users (email, password, nickname) values (?,?,?);";
            const insertUserParams = [email, password, nickname];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(insertUserQuery, insertUserParams);

            return row;
        } catch (err) {
            console.error(` ##### insertUser Query error #####`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### insertUser DB error #####`);
        return false;
    }
};

// 이메일 검사
exports.selectUserByEmail = async function(email) {
    try {
        //pool 객체를 통해서 데이터베이스에 접근이 잘 되는지 테스트 해보겠다
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectUserByEmailQuery = "select * from Users where email = ?;";
            const selectUserByEmailParams = [email];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(selectUserByEmailQuery, selectUserByEmailParams);

            return row;
        } catch (err) {
            console.error(` ##### selectUserByEmail Query error #####`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### selectUserByEmail DB error #####`);
        return false;
    }
};

exports.selectUser = async function(email, password) {
    try {
        //pool 객체를 통해서 데이터베이스에 접근이 잘 되는지 테스트 해보겠다
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectUserQuery = "select * from Users where email = ? and password = ?;";
            const selectUserParams = [email, password];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(selectUserQuery, selectUserParams);

            return row;
        } catch (err) {
            console.error(` ##### selectUser Query error #####`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### selectUser DB error #####`);
        return false;
    }
};

exports.selectNicknameByUserIdx = async function(userIdx) {
    try {
        //pool 객체를 통해서 데이터베이스에 접근이 잘 되는지 테스트 해보겠다
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectNicknameByUserIdxQuery = "select * from Users where userIdx = ?;";
            const selectNicknameByUserIdxParams = [userIdx];

            // 실제 쿼리를 날리는 부분
            // row라는 변수에 담겠다
            const [row] = await connection.query(selectNicknameByUserIdxQuery, selectNicknameByUserIdxParams);

            return row;
        } catch (err) {
            console.error(` ##### selectNicknameByUserIdx Query error #####`);

            return false;
        } finally {
            // mysql connection 종료 (종료 꼭 시켜줘야한다)
            // 아니면 과부하나 엉키는 에러가 날 수 있다.
            // 쿼리가 끝나면 항상 connection.release(); 해줘야 한다
            connection.release();
        }
    } catch(err) {
        console.error(` ##### selectNicknameByUserIdx DB error #####`);
        return false;
    }
};