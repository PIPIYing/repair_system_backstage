const express = require('express');
const router = express.Router();
const userDB =  require('../model/user');
const normalDB = require('../model/normal');
const param = require('../utils/params');

//查询用户账号信息（个人）
router.get('/getUserInfo', function(req, res, next) {
  let { userId } = { ...req.body };
  userDB.queryUserByUserId(userId).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      delete response.data[0].password;
      res.send({
        status: 200,
        data: response.data,
        message: '查询成功'
      })
    }
  })
});

//查看所有用户信息（全部）
router.get('/getAllUser', function(req, res, next) {
  let { current, pageSize} = { ...req.body };
  userDB.queryAllUser(current, pageSize).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      const data = {};
      data.list = response.data;
      normalDB.queryCount('user').then(response => {
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

//更新用户密码
router.post('/updatePassword', function(req, res, next) {
  let { id, password } = { ...req.body };
  userDB.updatePassword(id, password).then(response => {
    if(response.status === 500) {
      res.send(response);
    }
    else {
      res.send({
        status: 200,
        data: [],
        message: '修改成功'
      })
    }
  })
});

//普通用户进行师生认证
router.post('/schoolIdentify', function(req, res, next) {
  let { id, number, password } = { ...req.body };
  //查询这个number是否存在 不存在则学号不存在211
    //查询这个password是否正确 不正确则密码不正确212
      //查询这个number和password的条件下，user_id是否为空 非空则这个学号已经被认证213
  userDB.queryUserSchoolByNumber(number).then(response => {
    const data = response.data;
    if(response.status === 500) {
      res.send(response);
    }
    else {
      if(data.length !== 0) {
        if(data[0].password === password) {
          if(!data[0].user_id) {
            let role = data[0].role;
            //修改user_school表的userId
            userDB.updateUserSchool(id, role).then(response => {
              if(response.status === 500) {
                res.send(response);
              }
              else {
                //修改user表中用户的role
                userDB.updateRole(id, role).then(response => {
                  if(response.status === 500) {
                    res.send(response);
                  }
                  else {
                    res.send({
                      status: 200,
                      data: [],
                      message: '认证成功'
                    })
                  }
                });
              }
            });
          }
          else {
            res.send({
              status: 213,
              message: '该学号已被认证'
            })
          }
        }
        else {
          res.send({
            status: 212,
            message: '密码不正确'
          })
        }
      }
      else {
        res.send({
          status: 211,
          message: '学号不存在'
        })
      }
    }
  })
});

//删除用户账号信息
router.get('/deleteUser', function(req, res) {
  const { userId } = { ...req.body };
  userDB.deleteUserById(userId).then(response => {
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
