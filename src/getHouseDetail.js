const cheerio = require('cheerio');

/**
 * 解析房源详细信息
 * @param {String} body - 将要解析的html源码
 * @return {Object} 返回具体房产信息,
 */
let parseHouseDetail = (body) => {
  let $ = cheerio.load(body);
  let rent = $('b.f36.strongbox').text();
  let payType = $('div.house-desc-item.fl.c_333 > div > span.c_333').text();
  let leaseType = $(' div.house-desc-item.fl.c_333 > ul > li:nth-child(1) > span:nth-child(2)').text();
  let houseType = $(' div.house-desc-item.fl.c_333 > ul > li:nth-child(2) > span.strongbox').text().replace(/\s+/g,'');
  let area = $('div.house-desc-item.fl.c_333 > ul > li:nth-child(5) > span:nth-child(2) > a:nth-child(1)').text().trim();
  let detailAddress = $('div.house-desc-item.fl.c_333 > ul > li:nth-child(6) > span.dz').text().trim();
  let houseName = $('div.house-desc-item.fl.c_333 > ul > li:nth-child(4) > span:nth-child(2) > a').text();
  let address = area + detailAddress + houseName ;
  let owner = $('p.agent-name.f16.pr > a').text().trim();
  let ownerType = owner.match(/\(([^)]*)\)/)[1];

  return {
    rent,
    payType,
    leaseType,
    houseType,
    address,
    ownerType
  };
};

exports.parseHouseDetail = parseHouseDetail;
