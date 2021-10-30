//引入数据库连接
const connection =  require('../configs/mysql');
const dayjs = require('dayjs');

//查询notice表
//参数： userId current pageSize
function queryNotice(userId, current, pageSize) {
  var queryNoticeByUserIdSql;
  const currentSize = (current-1) * pageSize;
  if(userId === undefined) {
    queryNoticeByUserIdSql = `select * from notice limit ${currentSize},${pageSize}`;
  }else {
    queryNoticeByUserIdSql = `select * from notice where user_id = ${userId} limit ${currentSize},${pageSize}`;
  }
  return new Promise((resolve, reject) => {
    connection.query(queryNoticeByUserIdSql, function (err, data) {
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

//查询notice表
//参数：id
function queryNoticeById(id) {
  return new Promise((resolve, reject) => {
    const queryNoticeByIdSql = `select * from notice where id='${id}'`;
    connection.query(queryNoticeByIdSql, function (err, data) {
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

//向notice表插入数据
//参数：notice -> user_id,title,content,create_time
function insertNotice(notice) {
  return new Promise((resolve, reject) => {
    const insertNoticeSql = "insert into notice(user_id,title,content,create_time) values(?,?,?,?)";
    //获取当前时间戳
    notice.push(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    connection.query(insertNoticeSql, notice, function (err, data) {
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

//更新notice表数据
//参数：notice -> id, user_id,title,content,create_time
function updateNotice(notice) {
  return new Promise((resolve, reject) => {
    //获取当前时间戳
    notice.push(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const updateNoticeSql = `update notice set user_id = '${notice[1]}',title = '${notice[2]}',
      content = '${notice[3]}',create_time = '${notice[4]}' where id = '${notice[0]}'`;
    connection.query(updateNoticeSql, notice, function (err, data) {
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

//删除notice表数据
//参数：id
function deleteNoticeById(id) {
  return new Promise((resolve, reject) => {
    const deleteNoticeByIdSql = `delete from notice where id='${id}'`;
    connection.query(deleteNoticeByIdSql, function (err, data) {
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

module.exports = { queryNotice, queryNoticeById, insertNotice, updateNotice, deleteNoticeById };
