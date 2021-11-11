const express = require('express');
const router = express.Router();
const param = require("../utils/params");  //引入参数处理的函数
const userDB = require('../model/user');  //引入user数据模型
const serverDB = require('../model/staff');  //引入server数据模型
const vertoken = require('../configs/token');  //引入token
/*const uploader = require('../utils/uploader');*/

//注册
router.post('/register', function(req, res) {
  const user = req.body;
  res.sendStatus(200)
  //处理参数
  if(!user.image) {
    user.image = null;  //image默认值为null
  }
  const registerParams = param.toArray(user);
  //注册
  userDB.queryUserByPhone(registerParams[1]).then(response => {
    const data = response.data;
    if(response.status === 500) {
      res.send(response);
    }
    else {
      if(data.length === 0) {
        //用户未注册，为其注册
        userDB.insertUser(registerParams).then(response => {
          res.send({
            status: 200,
            data: [],
            message: '注册成功'
          });
        });
      }
      else {
        //用户已注册
        res.send({
          status: 201,
          message: '该手机号已被使用，请更换手机号重新注册！'
        });
      }
    }
  })
});

//登录
router.post('/login',function(req, res) {
  const user = req.body;
  //登录
  userDB.queryUserByPhone(user.phone).then(response => {
    const data = response.data;
    if(response.status === 500) {
      res.send(response);
    }
    else {
      if(data.length === 0) {
        //用户未注册
        res.send({
          status: 202,
          message: '该用户未注册！'
        });
      }
      else {
        //登录操作验证成功
        if(user.password === data[0].password) {
          var result = {};
          var serverId = "";
          //查询是否为维修管理员
          serverDB.queryServerByUserId(data[0].id).then(response => {
            if(response.data.length !== 0) {
              serverId = response.data[0].id;
            }
            //处理返回数据
            result.id = data[0].id;
            result.role = data[0].role;
            result.userName = data[0].user_name;
            result.url = data[0].image;
            result.serverId = serverId;
            //生成token
            vertoken.setToken(user.phone, user.password).then(token => {
              result.token = token;  //登录成功把生成的token发送给前端
              res.send({
                status: 200,
                data: result,
                message: '登录成功'
              })
            })
          });
        }
        else {
          res.send({
            status: 203,
            message: '密码错误'
          })
        }
      }
    }
  })
});

module.exports = router;
