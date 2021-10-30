//多参数转换
function toArray(obj) {
  var arr = [];
  for(let i in obj) {
    arr.push(obj[i]);
  }
  return arr;
}

//分页参数
const listInfo = {
  total: 0,
  current: 1,
  pageSize: 10
};

//分页参数处理
function toListInfo(total, current, pageSize) {
  listInfo.total = total;
  listInfo.current = current;
  listInfo.pageSize = pageSize;
  return listInfo;
}

module.exports = { toArray, toListInfo };
