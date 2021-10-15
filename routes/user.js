var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a ');
});

router.get('/test1', function(req, res, next) {
  res.send('respond with a test1');
});

router.get('/test2', function(req, res, next) {
  res.send('respond with a test2');
});

module.exports = router;
