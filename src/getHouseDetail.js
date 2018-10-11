const cheerio = require('cheerio');

/**
 * 解析房源详细信息
 * @param {String} body - 将要解析的html源码
 * @return {Object} 返回具体房产信息,
 */
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

exports.parseHouseDetail = parseHouseDetail;
