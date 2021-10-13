//引入数据库连接
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

//向user表插入数据
//参数：user -> user_name,phone,password,image
function insertUser(user) {
  return new Promise((resolve, reject) => {
    const insertUserSql = "insert into user(user_name,phone,password,image) values(?,?,?,?)";
    connection.query(insertUserSql, user, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '插入失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '插入成功'
        })
      }
    })
  })
}

module.exports = { queryUserByPhone, insertUser };
