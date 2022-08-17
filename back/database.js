// mysql2 라이브 러리 사용 선언
const mysql = require("mysql2/promise");

const {databaseSecret} = require("./secret")

// pool객체를 사용하여 워크벤치 접근
exports.pool = mysql.createPool(databaseSecret);