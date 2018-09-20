const {getDetailList} = require('./src/houseInfoList');
const {getProxy} = require('./util/getProxy');
const fs = require('fs');

const PROXY_INDEX = 50;
// getDetailList();
for (let i = 0;i<PROXY_INDEX; i++ ) {
  // console.log(i);
  getProxy(i);
}

// fs.readFile('./util/proxys.json',(error,data) => {
//   if (error) {
//     console.log(error);
//   }
//   let proxyStr = `[${data.toString()}]`;
//   let proxys = JSON.parse(proxyStr);
//   return proxys;
// });
