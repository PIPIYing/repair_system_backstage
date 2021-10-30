const express = require('express');
const router = express.Router();
const postDB = require('../model/post');
const normalDB = require('../model/normal');
const param = require('../utils/params');

//查看帖子（全部）
router.get('/getPost', function(req, res, next) {
  let { userId, current, pageSize} = { ...req.body };
  postDB.queryPost(undefined, current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCount('post', userId).then(response => {
        if(response.status === 500) {
          res.send(response);
        }
        else {
          let flag = 0;
          data.listInfo = param.toListInfo(response.data[0].col, current, pageSize);
          for(let i = 0; i < data.list.length; i++) {
            //计算某个帖子的点赞数
            normalDB.queryCountPost(data.list[i].id).then(response => {
              flag++;
              data.list[i].likeNum = response.data[0].col;
              if(flag === data.list.length) {
                for(let i = 0, flag = 0; i < data.list.length; i++) {
                  flag++;
                  //查询某个帖子的点赞状态
                  postDB.queryPostById(data.list[i].id, userId).then(response => {
                    data.list[i].isLike = response.data.length !== 0;
                    if(flag === data.list.length) {
                      res.send({
                        status: 200,
                        data: data,
                        message: '查询成功'
                      })
                    }
                  })
                }
              }
            })
          }
        }
      });
    }
  })
});

//发布帖子
router.post('/addPost', function(req, res) {
  //处理参数
  const post = req.body;
  //处理参数
  if(!post.image) {
    post.image = null;  //image默认值为null
  }
  const addPostParams = param.toArray(post);
  postDB.insertPost(addPostParams).then(response => {
    if(response.status === 500) {
      res.send(response);
    }else {
      res.send({
        status: 200,
        data: [],
        message: '发布成功'
      })
    }
  })
});

//删除帖子
router.get('/deletePost', function(req, res) {
  const { id } = { ...req.body };
  postDB.deletePostById(id).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      res.send({
        status: 200,
        data: [],
        message: '删除成功'
      })
    }
  })
});

//点赞/取消点赞帖子
router.get('/likePost', function(req, res) {
  const { id, userId } = { ...req.body };
  postDB.queryPostById(id, userId).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      if(response.data.length !== 0) {
        //删除点赞
        postDB.deletePostLikeById(id, userId).then(response => {
          if(response.status === 500) {
            res.send(response);
          }
          else {
            res.send({
              status: 200,
              data: [],
              message: '取消点赞成功'
            })
          }
        })
      }
      else {
        //新增点赞
        postDB.insertPostLike(id, userId).then(response => {
          if(response.status === 500) {
            res.send(response);
          }
          else {
            res.send({
              status: 200,
              data: [],
              message: '点赞成功'
            })
          }
        })
      }
    }
  })
});


module.exports = router;
