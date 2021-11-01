const express = require('express');
const router = express.Router();
const orderDB = require('../model/order');
const serverDB = require('../model/staff');
const normalDB = require('../model/normal');
const param = require('../utils/params');

//查看报修单（全部和我的）
router.get('/getAllOrder', function(req, res, next) {
  let { userId, current, pageSize} = { ...req.query };
  orderDB.queryAllOrder(userId, current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCount('\`order\`', userId).then(response => {
        if(response.status === 500) {
          res.send(response);
        }
        else {
          data.listInfo = param.toListInfo(response.data[0].col, current, pageSize);
          let flag = 0;
          let isSend = false;  //设个返回的测试tag
          //没有数据的时候  直接返回空数组
          if(data.list.length === 0) {
            res.send({
              status: 200,
              data: data,
              message: '查询成功'
            })
          }
          for(let i = 0; i<data.list.length; i++) {
            flag++;
            if(data.list[i].server_id) {
              serverDB.queryServerByServerId(data.list[i].server_id).then(response => {
                data.list[i].serverName = response.data[0].user_name;
                if(flag === data.list.length && !isSend) {
                  isSend = true;
                  res.send({
                    status: 200,
                    data: data,
                    message: '查询成功'
                  })
                }
              }).catch(err => {
                console.log(err);
              })
            }
            else {
              data.list[i].serverName = '无';
              //结束循环，返回data
              if(flag === data.list.length && !isSend) {
                isSend = true;
                res.send({
                  status: 200,
                  data: data,
                  message: '查询成功'
                })
              }
            }
          }
        }
      });
    }
  })
});

//查看报修单（后勤参与的）
router.get('/getStaffOrder', function(req, res, next) {
  let { serverId, current, pageSize} = { ...req.query };
  orderDB.queryStaffOrder(serverId, current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCountServerId('\`order\`', serverId).then(response => {
        if(response.status === 500) {
          res.send(response);
        }
        else {
          data.listInfo = param.toListInfo(response.data[0].col, current, pageSize);
          let flag = 0;
          //没有数据的时候  直接返回空数组
          if(data.list.length === 0) {
            res.send({
              status: 200,
              data: data,
              message: '查询成功'
            })
          }
          for(let i = 0; i<data.list.length; i++) {
            flag++;
            if(data.list[i].server_id) {
              serverDB.queryServerByServerId(data.list[i].server_id).then(response => {
                data.list[i].serverName = response.data[0].user_name;
                if(flag === data.list.length) {
                  res.send({
                    status: 200,
                    data: data,
                    message: '查询成功'
                  })
                }
              })
            }
            else {
              data.list[i].serverName = '无'
            }
          }
        }
      });
    }
  })
});

//新增报修单
router.post('/addOrder', function(req, res) {
  const order = req.body;
  const addOrderParams = param.toArray(order);
  console.log(addOrderParams);
  orderDB.insertOrder(addOrderParams).then(response => {
    if(response.status === 500) {
      res.send(response);
    }else {
      res.send({
        status: 200,
        data: [],
        message: '申请成功'
      })
    }
  })
});

//审核报修单
router.post('/updateOrder', function(req, res, next) {
  let { orderId, serverId, status } = { ...req.body };
  orderDB.updateOrder(orderId, serverId, status).then(response => {
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

//删除报修单
router.get('/deleteOrder', function(req, res) {
  const { orderId } = { ...req.query };
  orderDB.deleteOrderById(orderId).then(response => {
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

//查询查看订单评价
router.get('/getOrderEvaluate', function(req, res, next) {
  let { orderId, userId } = { ...req.query };
  orderDB.queryEvaluateByOrderId(orderId, userId).then(response => {
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

//新增评价
router.post('/addEvaluate', function(req, res) {
  const evaluate = req.body;
  const addEvaluateParams = param.toArray(evaluate);
  orderDB.insertEvaluate(addEvaluateParams).then(response => {
    if(response.status === 500) {
      res.send(response);
    }else {
      res.send({
        status: 200,
        data: [],
        message: '评价成功'
      })
    }
  })
});

module.exports = router;
