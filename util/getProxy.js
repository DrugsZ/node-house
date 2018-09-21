const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * 获取西刺代理页面
 *
 * @param {number} indedx - 要的页码
 * @returns {Object} error | response && body 成功时返回请求体,失败则返回错误原因
 */
let getProxyHtml = async (index) => {
  let options = {
    url:`http://www.xicidaili.com/nn/${index}`,
    methods:'GET',
    headers:{
      'User-agent':'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13 '
    }
  };
  return new Promise((resolve,reject) => {
    request(options,(error,response,body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({response,body});
    });
  });
};

/**
 *
 * @param {object} body html源代码
 */
let parseHtmltoXici = async (body) => {
  let $ = cheerio.load(body);
  let trs = $('#ip_list tr');
  let proxys = [];

  trs.map( (index,tr) => {
    let proxy = Object.create(null);
    let td = $(tr);
    let tds = td.children('td');
    if (!tds.length) return;
    proxy['ip'] = $(tds[1]).text();
    proxy['port'] =  $(tds[2]).text();

    if (proxy.ip && proxy.port) {
      proxy = JSON.stringify(proxy);
      proxys.push(proxy);
    }
  });
  proxys = proxys.join(',\n');
  // let path = path.resolve(__dirname, '../config')
  fs.writeFileSync(__dirname+'/proxys.json',proxys + ',\n',{flag:'a'});
};

/**
 *
 * @param {number} i - 获取指定页数的代理ip;
 */
let getProxy = async (i) => {
  // console.log(`正在抓取第${i}页内容`);
  let {body} = await getProxyHtml(i);
  parseHtmltoXici(body);
};
exports.getProxy = getProxy;
