/*
const express = require('express');
const app = express();
const vertoken = require('./configs/token');  //引入token
const expressJwt = require('express-jwt');  //引入Jwt插件

//解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['Authorization'];  //前端把token放在authorization并发送
  console.log("token:" + token);
  if(token === undefined) {
    next();
  }else {
    vertoken.getToken(token).then((data) => {  //解析token获取信息
      req.data = data;
      next();
    }).catch((err) => {
      next();
    })
  }
});

//验证token是否过期并规定哪些路由不需要验证（白名单）
app.use(expressJwt({
  secret: 'fxy_token_key',
  algorithms: ['HS256']  //algorithms的默认值 HS256/RS256
}).unless({
  path: ['/register', '/login']
}));

//token失效返回信息
app.use(function(err, req, res, next) {
  if(err.status === 401) {
    return res.status(401).send('token失效')
    //res.json({message:'token失效'})
  }
});

module.exports = app;
*/
