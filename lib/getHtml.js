const http = require('http');
const request = require('request')
const { randomHeader } = require('../util/util')
const fs = require('fs');

exports.getHtml = (option) => {
    return new Promise((resolve,reject) => {
        request(option,(error, response, body) => {
            if(error){
                reject(error);
                return;
            }
            if(response.statusCode == 200) {
                resolve(body) 
            }else{
                reject(error)
            }
        })
    })
}


let proxys = fs.readFileSync('./config/proxys.json','utf-8');

proxys = proxys.split(',');


/**
 * 生成随机浏览器头和转发
 * @param {string} url 请求地址
 * @param {Boolean} proxy 是否启用转发
 * @returns {object} option 返回生成的option 
 */
exports.createOptions = (url,proxy = false) => {
    let headers = randomHeader()
    let option = {
        url: url,
        proxy:proxy && proxys[Math.random() * proxys.length],
        method: 'GET',
        headers
    }

    return option
}

