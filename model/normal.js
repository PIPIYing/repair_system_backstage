//引入数据库连接
const connection =  require('../configs/mysql');

// 查询表的所有信息
/*function queryAll(table) {
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
}*/

//查询表的数据量（我的和所有）
//参数：table userId
function queryCount(table, userId) {
  return new Promise((resolve, reject) => {
    var queryCountSql;
    if(userId === undefined) {
      queryCountSql = "select count(*) as col from " + table;
    }
    else {
      queryCountSql = `select count(*) as col from ` + table + ` where user_id = ${userId}`;
    }
    connection.query(queryCountSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '查询失败'
        })
      }
      else {
        resolve({
          status: 200,
          data: data,
          message: '查询成功'
        })
      }
    })
  })
}

//查询表的数据量（后勤）
//参数：table serverId
function queryCountServerId(table, serverId) {
  return new Promise((resolve, reject) => {
    const queryCountServerIdSql = `select count(*) as col from ` + table + ` where server_id = ${serverId}`;
    connection.query(queryCountServerIdSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '查询失败'
        })
      }
      else {
        resolve({
          status: 200,
          data: data,
          message: '查询成功'
        })
      }
    })
  })
}

//查询表的数据量（后勤）
//参数：status
function queryCountServer(status) {
  return new Promise((resolve, reject) => {
    var queryCountServerSql = `select count(*) as col from apply where user_id in (select user_id FROM apply where status = ${status})`;
    connection.query(queryCountServerSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '查询失败'
        })
      }
      else {
        resolve({
          status: 200,
          data: data,
          message: '查询成功'
        })
      }
    })
  })
}

//查询表的数据量（帖子的点赞情况）
//参数：post_id
function queryCountPost(postId) {
  return new Promise((resolve, reject) => {
    const queryCountPostSql = `select count(*) as col from post_like where post_id = ${postId}`;
    connection.query(queryCountPostSql, function (err, data) {
      if (err) {
        resolve({
          status: 500,
          data: err,
          message: '查询失败'
        })
      }
      else {
        resolve({
          status: 200,
          data: data,
          message: '查询成功'
        })
      }
    })
  })
}


module.exports = { queryCount, queryCountServerId, queryCountServer, queryCountPost };
