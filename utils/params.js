//多参数转换
function toArray(obj) {
  var arr = [];
  for(let i in obj) {
    arr.push(obj[i]);
  }
  return arr;
}

module.exports = { toArray }
