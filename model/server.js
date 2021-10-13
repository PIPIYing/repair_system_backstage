//引入数据库连接
const connection =  require('../configs/mysql');

//查询server表
//参数：userId
function queryServerByUserId(userId) {
  return new Promise((resolve, reject) => {
    const queryServerByUserIdSql = `select * from server where user_id='${userId}'`;
    connection.query(queryServerByUserIdSql, function (err, data) {
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

module.exports = { queryServerByUserId };
