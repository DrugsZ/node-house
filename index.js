const getHtml = require('./api/getHtml')
const fs = require('fs');
const cheerio = require('cheerio');
const getProxy  = require('./api/freeProxySpider')


let URL = 'http://qd.58.com';


let write = (data) => {
    fs.writeFile(__dirname + '/' + 'log.json', data , {flag:'a'},(err) => {
        if(err){
            console.log(err)
        }
        console.log('save data success')
    })
}

let getIndexData = async (url,callback) => {
    let data = await getHtml(url);
    let $ = cheerio.load(data);
    let area = [];
    $("dl.secitem_fist >dd > a[onClick^='clickLog']").map( (index,item) => {
        let src = $(item).attr('href')
        area.push(src)
    })
    
    // area = JSON.stringify(area);
    write(area)
    return area
}

function getHouseInfo(html){
    let $ = cheerio.load(html);
    let infos = [];

    return $("ul.listUl > li[class!='apartments']")
}

const writeArea = async () => {
    let data = await getIndexData(URL+'/chuzu/',write);

    let indexUrl;
    let houseInfoHtml;
    let houseInfo;
    for (const item of data) {
        if(item === '/chuzu/')continue;
        indexUrl = URL + item
        console.log(indexUrl)
        houseInfoHtml = await getHtml(indexUrl)
        houseInfo = getHouseInfo(houseInfoHtml)

        write(houseInfo)
    }
}

getProxy(5)
// writeArea()
// getIndexData('http://qd.58.com/chuzu/')

