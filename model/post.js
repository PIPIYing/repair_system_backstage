//引入数据库连接
const connection =  require('../configs/mysql');
const dayjs = require('dayjs');

//查询post表
//参数：userId current pageSize
function queryPost(userId, current, pageSize) {
  var queryPostByUserIdSql;
  const currentSize = (current-1) * pageSize;
  if(userId === undefined) {
    queryPostByUserIdSql = `select * from post limit ${currentSize},${pageSize}`;
  }else {
    queryPostByUserIdSql = `select * from post where user_id = ${userId} limit ${currentSize},${pageSize}`;
  }
  return new Promise((resolve, reject) => {
    connection.query(queryPostByUserIdSql, function (err, data) {
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

//查询post表
//参数：post_id, user_id
function queryPostById(id, userId) {
  return new Promise((resolve, reject) => {
    const queryPostByIdSql = `select * from post_like where post_id=${id} and user_id=${userId}`;
    connection.query(queryPostByIdSql, function (err, data) {
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

//向post表插入数据
//参数：post -> user_id,content,image,create_time
function insertPost(post) {
  return new Promise((resolve, reject) => {
    const insertPostSql = "insert into post(user_id,user_name,url,content,image,create_time) values(?,?,?,?,?,?)";
    //获取当前时间戳
    post.push(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    connection.query(insertPostSql, post, function (err, data) {
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

//向post_like表插入数据
//参数：post_id, user_Id
function insertPostLike(postId, userId) {
  return new Promise((resolve, reject) => {
    const insertPostLikeSql = `insert into post_like(post_id, user_id) values(${postId},${userId})`;
    connection.query(insertPostLikeSql, function (err, data) {
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

//删除post表数据
//参数：id
function deletePostById(id) {
  return new Promise((resolve, reject) => {
    const deletePostByIdSql = `delete from post where id='${id}'`;
    connection.query(deletePostByIdSql, function (err, data) {
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

//删除post_like表数据
//参数：post_id, user_id
function deletePostLikeById(postId, userId) {
  return new Promise((resolve, reject) => {
    const deletePostLikeByIdSql = `delete from post_like where post_id='${postId}' and user_id='${userId}'`;
    connection.query(deletePostLikeByIdSql, function (err, data) {
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

module.exports = { queryPost, queryPostById, insertPost, insertPostLike, deletePostById, deletePostLikeById };
