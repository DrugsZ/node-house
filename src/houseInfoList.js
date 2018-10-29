const { getUrlByName } = require('../util/getCity');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const cityUrl = getUrlByName('青岛');
const pageIndex = 1;


const tranUrls = [];
let pending = false;

/**
 * 获取指定网页内容
 *
 * @param {string} url - 要获取html的网址；
 */
const getDetailList =  (url) => {
  request (`http:${cityUrl}pn${pageIndex}/`, (error, response, body) => {
    // saves(__dirname+'/body.html', body, (error) => {
    //   console.log(error);
    // });

    if (error) {
      console.log(error);
    }

    const $ = cheerio.load(body);
    const aTags = $('a.strongbox');

    aTags.map((index, aTag) => {
      const url = 'http:' + $(aTag).attr('href');
      tranUrls.push(url);
    });

    if (!pending) {
      pending = true;
      url2detail();
    }
  });
};

// fs.readFile(__dirname + '/urls.json', 'utf-8', (error, data) => {
//   if (error) {
//     console.log(error);
//   }

//   tranUrls = JSON.parse(data);

//   if (!pending) {
//     url2detail();
//   }
// });


const url2detail = () => {

  pending = false;
  const urls = tranUrls.slice(1, 3);

  tranUrls.length = 0;
  let url;
  for (url of urls) {
    const p = new Promise((resolve, reject) => {
      request (url, (error, response, body) => {
        if (error) {
          reject(error);
        }
        resolve(body);
      });
    });
    p.then(body => {
      const houseInfo = parseHouseDetail(body);
      fs.writeFile('./info.json', JSON.stringify(houseInfo), {flag:'a'}, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }).catch(error => {
      console.log(error);
    });

  }

};
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
