const http = require('http');
const request = require('request')
const { randomHeader } = require('./util')

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

/**
 * 生成随机浏览器头和转发
 * @param {string} url 请求地址
 * @param {string} proxy 转发地址
 * @returns {object} option 返回生成的option 
 */
exports.createOptions = (url,proxy) => {
    let headers = randomHeader()
    let option = {
        url: url,
        proxy,
        method: 'GET',
        headers
    }

    return option
}

