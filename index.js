// const {getDetailList} = require('./src/houseInfoList');
const {getProxy,testProxy} = require('./util/getProxy');
const fs = require('fs');
const { getHouseDetail } = require('./src/getHouseDetail');

const PROXY_INDEX = 50;
let proxyProimises = [];


fs.readFile('./config/proxys.json',async (error,data) => {
  if (error) {
    for (let i = 1;i<PROXY_INDEX; i++ ) {
    // console.log(i);
      const proxys = await getProxy(i);

      proxys.forEach(proxy => {
        if (proxy.ip && proxy.port) {
          proxyProimises.push(
            testProxy(`${proxy.ip}:${proxy.port}`)
          );
        }
      });
      
    }
    Promise.all(proxyProimises)
      .then((res)=>{
        let result = res.filter( proxy => proxy.status);
        let proxys = result.map(item=>item.proxyUrl);
        fs.writeFileSync(__dirname +'/config/proxys.json',JSON.stringify(proxys,null,2));
      }).catch(error => {
        console.log(error);
      });
  }
//   let proxyStr = `[${data.toString()}]`;
//   let proxys = JSON.parse(proxyStr);
//   return proxys;
});
