const { getHtml,createOptions } = require('./lib/getHtml')
const fs = require('fs');
const cheerio = require('cheerio');

// http://qd.rent.zhuge.com/s10/page/2/

const getZhugeData = async (i) => {

    let option = createOptions(`http://qd.rent.zhuge.com/s10/page/${i}/`)

    let body = await getHtml(option);

    let $ = cheerio.load(body);

    let ul = $('#listTableBox');

    let lis = ul.children()
    

    for (let item of Array.from(lis)) {
        let address = $(item).find('span.list-table-info-box > span:nth-child(2) > a:last-child ')[0].firstChild.data;
        let price = $(item).find('span.list-table-price-box > span > span > b')[0].firstChild.data;

        let obj = {
            address,
            price
        }

        fs.writeFile(__dirname + '/log.json',JSON.stringify(obj),{flag:'a'},(err,data) => {
            if(err){
                console.log(err)
            }
            console.log('save success')
        })
    }

    fs.writeFile(__dirname + '/log.json',li,{flag:'a'},(err,data) => {
        if(err){
            console.log(err)
        }
        console.log('save success')
    })
}


for (let i=0;i<500;i++){
    getZhugeData(i)
}