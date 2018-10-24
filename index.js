// const {getDetailList} = require('./src/houseInfoList');
const {getProxy, testProxy} = require('./util/getProxy');
const fs = require('fs');
const { getHouseDetail } = require('./src/houseInfolist');
const { creatListNode } = require('./util/util');

const PROXY_INDEX = 15;
const proxyProimises = [];
let proxys;

let hasProxyConfig = false;

try {
  fs.accessSync('./config/proxys.json');
  hasProxyConfig = true;
} catch (error) {
  (async () => {
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
  })();
}

fs.readFile('./config/proxys.json', async (error, data) => {
  if (error) {
    console.log(error);
  }
  const tempProxys = JSON.parse(data);
  proxys  = creatListNode(tempProxys);
});

fs.readFile(__dirname + 'src/urls.json', 'utf-8', (error, data) => {
  if (error) {
    console.log(JSON.stringify(error));
  }

  const urls = data;


});
