/*
const express = require('express');
const app = express();

//跨域
const cors = require('cors');
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
}));
//全局中间件，解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

module.exports = app;
*/
