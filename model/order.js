//引入数据库连接
const connection =  require('../configs/mysql');
const dayjs = require('dayjs');

//查询order表
//参数：userId current pageSize
function queryAllOrder(userId, current, pageSize) {
  const currentSize = (current-1) * pageSize;
  var queryAllOrderSql;
  if(userId === undefined) {
    queryAllOrderSql = `select * from \`order\` limit ${currentSize},${pageSize}`;
  }
  else {
    queryAllOrderSql = `select * from \`order\` where user_id = ${userId} limit ${currentSize},${pageSize}`;
  }
  return new Promise((resolve, reject) => {
    connection.query(queryAllOrderSql, function (err, data) {
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

//查询order表
//参数：serverId current pageSize
function queryStaffOrder(serverId, current, pageSize) {
  const currentSize = (current-1) * pageSize;
  const queryStaffOrderSql = `select * from \`order\` where server_id = ${serverId} limit ${currentSize},${pageSize}`;
  return new Promise((resolve, reject) => {
    connection.query(queryStaffOrderSql, function (err, data) {
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

//向order表插入数据
//参数：order ->user_id,type_id,campus,building,address,name,phone,detail,image,start_time,end_time,create_time,remark
function insertOrder(order) {
  return new Promise((resolve, reject) => {
    const insertOrderSql = "insert into `order`(user_id,type_id,campus,building,address,name,phone,detail,image,start_time,end_time,remark,create_time) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    //获取当前时间戳
    order.push(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    connection.query(insertOrderSql, order, function (err, data) {
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

//更新order表数据
//参数：orderId, serverId, status
function updateOrder(orderId, serverId, status) {
  return new Promise((resolve, reject) => {
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const updateOrderSql = `update \`order\` set status = ${status}, server_id = ${serverId}, create_time = '${time}' where id = ${orderId}`;
    connection.query(updateOrderSql, function (err, data) {
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

//删除order表数据
//参数：id
function deleteOrderById(id) {
  return new Promise((resolve, reject) => {
    const deleteOrderByIdSql = `delete from \`order\` where id='${id}'`;
    connection.query(deleteOrderByIdSql, function (err, data) {
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

//查询evaluate表
//参数：order_id, user_id
function queryEvaluateByOrderId(orderId, userId) {
  return new Promise((resolve, reject) => {
    const queryEvaluateByOrderIdSql = `select * from evaluate where order_id=${orderId} and user_id = ${userId}`;
    connection.query(queryEvaluateByOrderIdSql, function (err, data) {
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


//向evaluate表插入数据
//参数：evaluate -> user_id,order_id,server_id,star,feedback
function insertEvaluate(evaluate) {
  return new Promise((resolve, reject) => {
    const insertEvaluateSql = "insert into evaluate(user_id,order_id,server_id,star,feedback) values(?,?,?,?,?)";
    connection.query(insertEvaluateSql, evaluate, function (err, data) {
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

module.exports = { queryAllOrder, queryStaffOrder, insertOrder, updateOrder, deleteOrderById,
  queryEvaluateByOrderId, insertEvaluate, };
