const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { creatListNode } = require('./util');

/**
 * 获取西刺代理页面
 *
 * @param {number} indedx - 要的页码
 * @returns {Object} error | response && body 成功时返回请求体,失败则返回错误原因
 */
const getProxyHtml = async (index) => {
  const options = {
    url:`http://www.xicidaili.com/nn/${index}`,
    methods:'GET',
    headers:{
      'User-agent':'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13 '
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({response, body});
    });
  });
};

/**
 *
 * @param {object} body html源代码
 */
const parseHtmltoXici = (body) => {
  const $ = cheerio.load(body);
  const trs = $('#ip_list tr');
  const proxys = [];

  trs.map((index, tr) => {
    const proxy = Object.create(null);
    const td = $(tr);
    const tds = td.children('td');
    if (!tds.length) return;
    proxy['ip'] = $(tds[1]).text();
    proxy['port'] =  $(tds[2]).text();

    proxys.push(proxy);


  });

  return proxys;

};

/**
 *
 * @param {string} proxyUrl - 将要测试的转发地址
 * @returns {Promise} 返回代理是否可用
 */
const testProxy = (proxyUrl) => {
  return new Promise((resolve, reject) => {
    request('http://libs.baidu.com/jquery/1.9.0/jquery.js', {
      proxy:`http://${proxyUrl}`,
      timeout:15000
    }, (error, response) => {
      if (error) {
        resolve({
          detail:error,
          status:false,
          proxyUrl
        });
        return;
      }

      if (response.statusCode && response.statusCode == 200) {
        resolve({
          status:true,
          proxyUrl
        });
        return;
      }

      resolve({
        detail:response,
        status:false,
        proxyUrl
      });
    });
  });
};

/**
 *
 * @param {number} i - 获取指定页数的代理ip;
 */
const getProxy = async (i) => {
  // console.log(`正在抓取第${i}页内容`);
  const {body} = await getProxyHtml(i);
  const proxys = parseHtmltoXici(body);
  return proxys;
};


const proxyList = () => {

  let hasProxyConfig = false;

  const PROXY_INDEX = 15;
  const proxyProimises = [];

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

  let proxys;

  fs.readFile('./config/proxys.json', async (error, data) => {
    if (error) {
      console.log(error);
    }
    const tempProxys = JSON.parse(data);
    proxys  = creatListNode(tempProxys);
  });

  return proxys;
};




module.exports = {
  proxyList
};
