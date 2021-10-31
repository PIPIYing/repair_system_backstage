//引入数据库连接
const connection =  require('../configs/mysql');
const dayjs = require('dayjs');

//查询server表
//参数：serverId
function queryServerByServerId(serverId, status) {
  return new Promise((resolve, reject) => {
    const queryServerByServerIdSql = `select * from server where user_id in (select user_id from apply where status = ${status}) and id = ${serverId}`;
    connection.query(queryServerByServerIdSql, function (err, data) {
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

//查询server表
//参数：current pageSize status
function queryAllServerByStatus(current, pageSize, status) {
  const currentSize = (current-1) * pageSize;
  const queryAllServerSql = `select * from server where user_id in (select user_id from apply where status = ${status}) limit ${currentSize},${pageSize}`;
  return new Promise((resolve, reject) => {
    connection.query(queryAllServerSql, function (err, data) {
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

//查询apply表
//参数：current pageSize
function queryAllApply(current, pageSize) {
  const currentSize = (current-1) * pageSize;
  const queryAllApplySql = `select * from apply limit ${currentSize},${pageSize}`;
  return new Promise((resolve, reject) => {
    connection.query(queryAllApplySql, function (err, data) {
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

//向server表插入数据
//参数：server -> user_id, type_id, user_name, sex, age, experience, phone
function insertServer(server) {
  return new Promise((resolve, reject) => {
    const insertServerSql = "insert into server(user_id,type_id,user_name,sex,age,experience,phone) values(?,?,?,?,?,?,?)";
    //获取当前时间戳
    connection.query(insertServerSql, server, function (err, data) {
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

//向apply表插入数据
//参数：apply -> user_id,server_id,reason,user_name,create_time
function insertApply(apply) {
  apply.push(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  return new Promise((resolve, reject) => {
    const insertApplySql = `insert into apply(user_id,server_id,user_name,reason,create_time) values(?,?,?,?,?)`;
    connection.query(insertApplySql, apply, function (err, data) {
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

//更新apply表数据
//参数：id, status
function updateApply(id, status) {
  return new Promise((resolve, reject) => {
    const updateApplySql = `update apply set status = '${status}' where id = '${id}'`;
    connection.query(updateApplySql, function (err, data) {
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

//删除server表数据
//参数：id
function deleteServerById(id) {
  return new Promise((resolve, reject) => {
    const deleteServerByIdSql = `delete from server where id='${id}'`;
    connection.query(deleteServerByIdSql, function (err, data) {
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
  queryServerByServerId, queryAllServerByStatus, queryServerByUserId, queryAllApply,
  insertServer, insertApply,
  updateApply,
  deleteServerById };
