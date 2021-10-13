const express = require('express');
const router = express.Router();

//分级路由
router.use('/index', require("./index"));
router.use('/user', require("./users"));
router.use('/', require("./login"));


module.exports = router;
