const express = require('express');
const router = express.Router();
const noticeDB = require('../model/notice');
const normalDB = require('../model/normal');
const param = require('../utils/params');

//查看公告（全部和我发布的）
router.get('/getNotice', function(req, res, next) {
  //解购赋值，处理参数(没有就不要传)
  let { userId, current, pageSize} = { ...req.query };
  noticeDB.queryNotice(userId, current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCount('notice', userId).then(response => {
        if(response.status === 500) {
          res.send(response);
        }
        else {
          data.listInfo = param.toListInfo(response.data[0].col, current, pageSize);
          res.send({
            status: 200,
            data: data,
            message: '查询成功'
          })
        }
      });
    }
  })
});

//发布公告
router.post('/addNotice', function(req, res) {
  //处理参数
  const notice = req.body;
  const addNoticeParams = param.toArray(notice);
  noticeDB.insertNotice(addNoticeParams).then(response => {
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

//更新公告（后勤维修员）
router.post('/updateNotice', function(req, res) {
  //处理参数
  const notice = req.body;
  const updateNoticeParams = param.toArray(notice);
  //根据id查找是不是这个userId发布的公告
  noticeDB.queryNoticeById(updateNoticeParams[0]).then(response => {
    const data = response.data;
    if(response.status === 500) {
      res.send(response);
    }
    else {
      //该用户可以修改该公告
      if(data[0].user_id == updateNoticeParams[1]) {
        noticeDB.updateNotice(updateNoticeParams).then(response => {
          res.send({
            status: 200,
            data: [],
            message: '更新成功'
          })
        })
      }
      else {
        res.send({
          status: 301,
          message: '该公告不是您发布的，不允许更新'
        })
      }
    }
  })
});

//更新公告（系统管理员）
router.post('/updateNoticeBySystem', function(req, res) {
  //处理参数
  const notice = req.body;
  const updateNoticeParams = param.toArray(notice);
  noticeDB.updateNotice(updateNoticeParams).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      res.send({
        status: 200,
        data: [],
        message: '更新成功'
      })
    }
  })
});

//删除公告（后勤维修员）
router.get('/deleteNotice', function(req, res) {
  let { id, userId } = { ...req.query };
  //根据id查找是不是这个userId发布的公告
  noticeDB.queryNoticeById(id).then(response => {
    const data = response.data;
    if(response.status === 500) {
      res.send(response);
    }
    else {
      //该用户可以修改该公告
      if(data[0].user_id == userId) {
        noticeDB.deleteNoticeById(id).then(response => {
          res.send({
            status: 200,
            data: [],
            message: '删除成功'
          })
        })
      }
      else {
        res.send({
          status: 301,
          message: '该公告不是您发布的，不允许删除'
        })
      }
    }
  })
});

//删除公告（系统管理员）
router.get('/deleteNoticeBySystem', function(req, res) {
  let { id } = {...req.query };
  noticeDB.deleteNoticeById(id).then(response => {
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

module.exports = router;
