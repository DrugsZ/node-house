const mysql      = require('mysql');
const {
  MYSQL_USER_NAME,
  MYSQL_PASS_WORD,
  MYSQL_DATA_BASE,
  MYSQL_PORT,
  MYSQL_HOST} = require('../config/config');

const connection = mysql.createConnection({
  host     : MYSQL_HOST ? MYSQL_HOST : 'localhost',
  user     : MYSQL_USER_NAME ? MYSQL_USER_NAME : 'root',
  password : MYSQL_PASS_WORD,
  port: MYSQL_PORT ? MYSQL_PORT : '3306',
  database : MYSQL_DATA_BASE
});

var sql = 'SELECT * FROM detail_list';	// sql命令
connection.query(sql, (err, results, fields) => {	// results 为查询的结果 fields 为返回的信息
  if (err) {
    console.log('[SELECT ERROR] -', err.message);
    return;
  }

  console.log('------------SELECT-------------');
  console.log(results);	// 输出查询的结果
  console.log('--------------------------------');
});
