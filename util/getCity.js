const {independentCityList,cityList } = require('./citys');

const citys = [];

for ( let key in independentCityList) {
  let cityInfo = Object.create(null);
  cityInfo.address = `//${independentCityList[key].split('|')[0]}.58.com/`;
  cityInfo.name = key;
  citys.push(cityInfo);
}

for ( let subCitys in cityList) {
  for ( let city in cityList[subCitys] ) {
    let cityInfo = Object.create(null);
    cityInfo.address = `//${cityList[subCitys][city].split('|')[0]}.58.com/`;
    cityInfo.name = city;
    citys.push(cityInfo);
  }
}
/**
 * 通过城市名,获取地址
 * @param {string} cityName - 要获取地址的城市名
 * @returns {string}  对应的地址
 */
let getUrlByName = (cityName) => {
  return citys.find( item => item.name === cityName).address + 'chuzu/';
};


exports.getUrlByName = getUrlByName;