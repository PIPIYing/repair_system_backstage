const multer = require('multer');
const path = require('path');

//图片上传中间件
const uploader = multer({
  dest: path.join(path.dirname(__dirname),'public','uploadImg')
});

module.exports = uploader;
