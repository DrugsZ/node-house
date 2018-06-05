const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');
const { getHtml,createOptions } = require('./getHtml')

let proxys = [];  //保存从网站上获取到的代理
let useful = 0;  //保存检查过有效性的代理



let getProxy = async (PageIndex) =>{
    for( let i = 0; i < PageIndex; i++){
        await getXici(i)
    }
    console.log(`当前共获取代理服务器${proxys.length}个`)
    console.log(`开始检查代理可用性`)
    check()
}

/**
 * 获取www.xicidaili.com提供的免费代理
 */
async function getXici(i = 1) {
    url = `http://www.xicidaili.com/nn/${i}`;  // 国内高匿代理

    let option = createOptions("http://www.xicidaili.com/nn");
    let body = await getHtml(option);

    if(!body)return;
    let $ = cheerio.load(body);
    let trs = $("#ip_list tr");
    for(let i=1;i<trs.length;i++) {
        let proxy = {};
        tr = trs.eq(i);
        tds = tr.children("td");
        proxy['ip'] = tds.eq(1).text();
        proxy['port'] = tds.eq(2).text();
        var speed = tds.eq(6).children("div").attr("title");
        speed = speed.substring(0, speed.length-1);
        var connectTime = tds.eq(7).children("div").attr("title");
        connectTime = connectTime.substring(0, connectTime.length-1);
        if(speed <= 5 && connectTime <= 1) { //用速度和连接时间筛选一轮
            proxys.push(proxy);
        }
    }
}

/**
 * 过滤无效的代理
 */
function check() {
    //尝试请求百度的静态资源公共库中的jquery文件
    let url = "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";

    let flag = proxys.length;  //检查是否所有异步函数都执行完的标志量
    for(let i=0;i<proxys.length;i++) {
        let proxy = proxys[i];
        let option = createOptions(url,"http://" + proxy['ip'] + ":" + proxy['port'])

        option.timeout = 20000;

        const res =getHtml(option).then( res => {
            saveProxys(option.proxy)
            useful++;
            flag--;
            if(flag == 0){
                console.log(`当前共获取代理服务器${proxys.length}个;可用代理${useful}个`)
            }
            console.log(`IP:${i} => ${option.proxy}连接成功,已将该IP写入本地文件`)
        },res=>{
            console.log(`IP => ${option.proxy}连接失败`)
        }).catch( error => {
            console.log(error)
        })

    }
}

/**
 * 把获取到的有用的代理保存成json文件，以便在别处使用
 */
function saveProxys(proxy) {
    let config = path.resolve(__dirname, '../config')
    fs.writeFileSync(config+'/proxys.txt', JSON.stringify(proxy)+',\r\n',{flag:'a'});
}

// getXici();  //启动这个爬虫

module.exports = getProxy
