const express = require('express');
const router = express.Router();

//分级路由
router.use('/', require("./login"));
router.use('/user', require("./user"));
router.use('/staff', require("./staff"));
router.use('/notice', require("./notice"));
router.use('/order', require("./order"));
router.use('/post', require("./post"));

module.exports = router;
