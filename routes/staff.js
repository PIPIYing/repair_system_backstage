const express = require('express');
const router = express.Router();
const staffDB = require('../model/staff');
const normalDB = require('../model/normal');
const userDB =  require('../model/user');
const param = require('../utils/params');

//查看后勤维修员信息（个人）
router.get('/getStaffInfo', function(req, res, next) {
  let { serverId } = { ...req.query };
  staffDB.queryServerByServerId(serverId).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      res.send({
        status: 200,
        data: response.data,
        message: '查询成功'
      })
    }
  })
});

//查看所有后勤维修员信息（全部）
router.get('/getAllStaff', function(req, res, next) {
  let { current, pageSize} = { ...req.query };
  staffDB.queryAllServerByStatus(current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCountServer().then(response => {
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

//新增后勤维修员信息
router.post('/addStaffInfo', function(req, res) {
  const server = req.body;
  const addServerParams = param.toArray(server);
  staffDB.insertServer(addServerParams).then(response => {
    if(response.status === 500) {
      res.send(response);
    }else {
      res.send({
        status: 200,
        data: response.data.insertId,
        message: '新增成功'
      })
    }
  })
});

//普通用户进行后勤维修员申请
router.post('/addStaffApply', function(req, res) {
  const apply = req.body;
  const addApplyParams = param.toArray(apply);
  staffDB.insertApply(addApplyParams).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      res.send({
        status: 200,
        data: [],
        message: '申请成功，请等待系统管理员审核'
      })
    }
  })
});

//删除后勤维修员信息
router.get('/deleteStaff', function(req, res) {
  const { userId, serverId } = { ...req.query };
  staffDB.deleteServerById(serverId).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      userDB.updateRole(userId, 5).then(response => {
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
    }
  })
});

//查看后勤维修员申请信息（全部）
router.get('/getStaffApply', function(req, res, next) {
  let { current, pageSize} = { ...req.query };
  staffDB.queryAllApply(current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCount('apply').then(response => {
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

//处理后勤维修员的申请
router.get('/deleteApplyById', function(req, res, next) {
  let { id, userId, status } = { ...req.query };
  staffDB.deleteApplyById(id).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      if(status == 1) {
        //修改user表中用户的role
        userDB.updateRole(userId, 2).then(response => {
          if(response.status === 500) {
            res.send(response);
          }
          else {
            res.send({
              status: 200,
              data: [],
              message: '审核已通过'
            })
          }
        });
      }
      else {
        res.send({
          status: 200,
          data: [],
          message: '审核已拒绝'
        })
      }
    }
  })
});


module.exports = router;
