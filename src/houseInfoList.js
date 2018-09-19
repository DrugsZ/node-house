const { getUrlByName } = require('../util/getCity');
const request = require('request');
const cherrio = require('cheerio');
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
let saves = (name,data,callback) => {
  fs.writeFile(name,data,(err) => {
    callback.call(null,err);
  });
};

/**
 * 获取指定网页内容
 * 
 * @param {string} url - 要获取html的网址；
 */
let getDetailList =  async(url) => {
  request (`http:${cityUrl}pn${pageIndex}/`,(req,response,body) => {
    
  });
};