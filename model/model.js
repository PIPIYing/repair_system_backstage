//引入数据库连接
const connection =  require('../configs/mysql');

// 查询表的所有信息
function queryAll(table) {
  return new Promise((resolve, reject) => {
    const queryAllSql = "select * from " + table;
    connection.query(queryAllSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '查询失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '查询成功'
        })
      }
    })
  })
}

module.exports = { queryAll };

//单参数查询
/*
* //引入数据库连接
const connection =  require('../configs/mysql');

//查询user表
//参数：phone
function queryUserByPhone(phone) {
  return new Promise((resolve, reject) => {
    const queryUserByPhoneSql = `select * from user where phone='${phone}'`;
    connection.query(queryUserByPhoneSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '查询失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '查询成功'
        })
      }
    })
  })
}

module.exports = { queryUserByPhone };

* */
