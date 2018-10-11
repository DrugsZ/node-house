// const {getDetailList} = require('./src/houseInfoList');
const {getProxy, testProxy} = require('./util/getProxy');
const fs = require('fs');
const { getHouseDetail } = require('./src/getHouseDetail');

const PROXY_INDEX = 15;
const proxyProimises = [];


fs.readFile('./config/proxys.json', async (error, data) => {
  if (error) {
    let allProxys = [];
    for (let i = 1;i<PROXY_INDEX; i++ ) {
    // console.log(i);
      const proxys = await getProxy(i);

      allProxys = allProxys.concat(proxys);
    }
    allProxys.forEach(proxy => {
      if (proxy.ip && proxy.port) {
        proxyProimises.push(
          testProxy(`${proxy.ip}:${proxy.port}`)
        );
      }
    });
    Promise.all(proxyProimises)
      .then((res) => {
        const result = res.filter( proxy => proxy.status);
        const proxys = result.map(item => item.proxyUrl);
        fs.writeFileSync(__dirname +'/config/proxys.json', JSON.stringify(proxys, null, 2));
      }).catch(error => {
        console.log(error);
      });
  }
//   let proxyStr = `[${data.toString()}]`;
//   let proxys = JSON.parse(proxyStr);
//   return proxys;
});
