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

