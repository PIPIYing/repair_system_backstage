//用于生成和解析token
var jwt = require('jsonwebtoken');
var jwtScrect = 'fxy_token_key';

var setToken = function(phone, password) {
  return new Promise((resolve, reject) => {
    //expiresln 设置token过期的时间
    const token = jwt.sign({
      phone: phone,
      password: password
    }, jwtScrect, { expiresIn: '1h' });  //sign是生成token的方法，包括密钥jwtScrect和过期时间
    resolve(token)
  })
};

var getToken = function(token) {
  return new Promise((resolve, reject) => {
    if(!token) {
      reject({
        err: 'token为空'
      })
    }else {
      //verify是验证token的方法，通过设置的jwtScrect来验证
      var info = jwt.verify(token.split(' ')[1], jwtScrect);
      resolve(info);
    }
  })
};

module.exports = {
  setToken,
  getToken
};
