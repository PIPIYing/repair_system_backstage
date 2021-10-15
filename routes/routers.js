const express = require('express');
const router = express.Router();

//分级路由
router.use('/', require("./login"));
router.use('/user', require("./user"));
router.use('/server', require("./server"));
router.use('/notice', require("./notice"));
router.use('/order', require("./order"));
router.use('/post', require("./post"));

module.exports = router;
