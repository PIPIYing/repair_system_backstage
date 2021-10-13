//引入依赖包
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');  //body-parser
const session = require('express-session');  //session
const vertoken = require('./configs/token');  //引入token
const expressJwt = require('express-jwt');  //引入Jwt插件

//创建应用实例
const app = express();

//设置视图目录和模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//内置中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由中间件 —— 模块化处理（分级路由）
app.use('/', require("./routes/routers"));

//body-parser的处理：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//body-parser的处理：application.json
app.use(bodyParser.json());

//404错误处理中间件
app.use(function(req, res, next) {
  next(createError(404));
});

//错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//跨域
const cors = require('cors');
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
}));
//全局中间件，解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');  //头部要携带token
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method.toUpperCase() === 'OPTIONS') {  //让options尝试请求快速结束
    res.sendStatus(200); // 在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }
});

//解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['Authorization'];  //前端把token放在authorization并发送
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
}))

//token失效返回信息
app.use(function(err, req, res, next) {
  if(err.status === 401) {
    return res.status(401).send('token失效')
    //res.json({message:'token失效'})
  }
})

//导出app实例对象
module.exports = app;
