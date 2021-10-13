//引入依赖包
const express = require('express');
//创建路由对象
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
