const { getUrlByName } = require('../util/getCity');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const cityUrl = getUrlByName('青岛');
const pageIndex = 1;


const tranUrls = [];

/**
  * fs写入二次封装
  * @param {string} name-目标文件名;
  * @param {*} data-将要写入的数据;
  * @param {function} callback-错误处理回调;
  */
const saves = (name, data, callback) => {
  fs.writeFile(name, data, (err) => {
    callback.call(null, err);
  });
};

/**
 * 获取指定网页内容
 *
 * @param {string} url - 要获取html的网址；
 */
const getDetailList =  (url) => {
  request (`http:${cityUrl}pn${pageIndex}/`, (error, response, body) => {
    saves(__dirname+'/body.html', body, (error) => {
      console.log(error);
    });
    // let $ = cherrio.load(body);
    // let ul = $('.listUl');
    // let liList = ui
  });
};

fs.readFile(__dirname + '/body.html', (err, data) => {
  if (err) {
    console.log(err);
  }

  const body = data.toString();
  const $ = cheerio.load(body);
  const aTags = $('a.strongbox');

  aTags.map((index, aTag) => {
    const url = 'http://' + $(aTag).attr('href');
    tranUrls.push(url);
  });

  saves(__dirname+'/urls.json', JSON.stringify(tranUrls), (error) => {
    console.log(error);
  });
});

const parseHouseDetail = (body) => {
  const $ = cheerio.load(body);
  const rent = $('b.f36.strongbox').text();
  const payType = $('div.house-desc-item.fl.c_333 > div > span.c_333').text();
  const leaseType = $(' div.house-desc-item.fl.c_333 > ul > li:nth-child(1) > span:nth-child(2)').text();
  const houseType = $(' div.house-desc-item.fl.c_333 > ul > li:nth-child(2) > span.strongbox').text().replace(/\s+/g, '');
  const area = $('div.house-desc-item.fl.c_333 > ul > li:nth-child(5) > span:nth-child(2) > a:nth-child(1)').text().trim();
  const detailAddress = $('div.house-desc-item.fl.c_333 > ul > li:nth-child(6) > span.dz').text().trim();
  const houseName = $('div.house-desc-item.fl.c_333 > ul > li:nth-child(4) > span:nth-child(2) > a').text();
  const address = area + detailAddress + houseName ;
  const owner = $('p.agent-name.f16.pr > a').text().trim();
  const ownerType = owner.match(/\(([^)]*)\)/)[1];

  return {
    rent,
    payType,
    leaseType,
    houseType,
    address,
    ownerType
  };
};

exports.getDetailList = getDetailList;
exports.parseHouseDetail = parseHouseDetail;
