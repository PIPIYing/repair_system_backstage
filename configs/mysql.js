//连接数据库
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password : '123456',
  database : 'repair_system'
});

module.exports = connection;


