//引入数据库连接
const connection =  require('../configs/mysql');

//查询user表
//参数：current pageSize
function queryAllUser(current, pageSize) {
  const currentSize = (current-1) * pageSize;
  const queryAllUserSql = `select * from user limit ${currentSize},${pageSize}`;
  return new Promise((resolve, reject) => {
    connection.query(queryAllUserSql, function (err, data) {
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

//查询user表
//参数：userId
function queryUserByUserId(userId) {
  return new Promise((resolve, reject) => {
    const queryUserByUserIdSql = `select * from user where id='${userId}'`;
    connection.query(queryUserByUserIdSql, function (err, data) {
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

//查询user_school表
//参数：number
function queryUserSchoolByNumber(number) {
  return new Promise((resolve, reject) => {
    const queryUserSchoolByNumberIdSql = `select * from user_school where number='${number}'`;
    connection.query(queryUserSchoolByNumberIdSql, function (err, data) {
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

//更新user表数据
//参数：id, password
function updatePassword(id, password) {
  return new Promise((resolve, reject) => {
    const updatePasswordSql = `update user set password = '${password}' where id = '${id}'`;
    connection.query(updatePasswordSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '更新失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '更新成功'
        })
      }
    })
  })
}

//更新user表数据 修改role
//参数：id, role
function updateRole(id, role) {
  return new Promise((resolve, reject) => {
    const updateRoleSql = `update user set role = '${role}' where id = '${id}'`;
    connection.query(updateRoleSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '更新失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '更新成功'
        })
      }
    })
  })
}

//更新user_school表数据 填入user_id
//参数：id, role
function updateUserSchool(id, role) {
  return new Promise((resolve, reject) => {
    const updateUserSchoolSql = `update user_school set user_id = '${id}' where role = '${role}'`;
    connection.query(updateUserSchoolSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '更新失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '更新成功'
        })
      }
    })
  })
}

//删除user表数据
//参数：id
function deleteUserById(id) {
  return new Promise((resolve, reject) => {
    const deleteUserByIdSql = `delete from user where id='${id}'`;
    connection.query(deleteUserByIdSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '删除失败'
        })
      } else {
        resolve({
          status: 200,
          data: data,
          message: '删除成功'
        })
      }
    })
  })
}

module.exports = {
  queryAllUser, queryUserByPhone, queryUserByUserId, queryUserSchoolByNumber,
  insertUser,
  updatePassword, updateRole, updateUserSchool,
  deleteUserById };
