const axios = require("axios");
const cheerio = require('cheerio');
const {workerData} = require("worker_threads");

let userAgent = [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246', 'Accept-Language' : '*'}
    , {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36", 'Accept-Language' : '*'},
    {'User-Agent' : "APIs-Google (+https://developers.google.com/webmasters/APIs-Google.html)", 'Accept-Language' : '*'}
]

let hostObj = [];

axios.get("https://rootfails.com/proxy/f021011c43b83a07a58d3708aed53f5b").then(data => {
    let host = data.data.split("\n");

    host.forEach(proxy => {

        const obj = {};
        obj.host = proxy.split(":")[0];
        obj.port = proxy.split(":")[1];
        obj.headers = userAgent[Math.floor(Math.random() * 6)]
        obj.proxy = {};
        obj.proxy.host = proxy.split(":")[0];
        obj.proxy.port = proxy.split(":")[1];
        obj.proxy.headers = userAgent[Math.floor(Math.random() * 6)]

        hostObj.push(obj);
    })

})



async function parseData(url) {
   const {data} = await axios.get(url, hostObj[Math.floor(Math.random() * hostObj.length)]).catch(console.log)
    console.log(data)
   const $ = cheerio.load(data);
   const obj = {};

   const header = $('h1.Uheader');

   obj.brand = $(header[0]).text();

   const category = $('div.cathead');
   const categoryArray = [];

   for (let i = 0; i < category.length; i++) {
       categoryArray.push({"href":  $(category[i]).children("a").attr('href'), "text": $(category[i]).children("a").text().replace(/[^a-zA-Z0-9 ]/g, '').trim()})
   }

   for (let i = 0; i < categoryArray.length; i++) {
       obj.category = categoryArray[i].text;
       const dataTwo = await axios.get("https://www.manualslib.com" + categoryArray[i].href, hostObj[Math.floor(Math.random() * hostObj.length)]).catch(console.log)
       const cher = cheerio.load(dataTwo.data);


       const aTag = cher('div.col-sm-2.mname')
       const aTagArray = [];


       for (let j = 0 ; j < aTag.length; j++) {
           aTagArray.push({"href":  $(aTag[j]).children("a").attr('href'), "text": $(aTag[j]).children("a").text().replace(/[^a-zA-Z0-9 ]/g, '').trim()})
       }

       aTagArray.forEach((tag, index) => {
           obj.url = "https://www.manualslib.com" + tag.href;
           obj.title = obj.brand + " " + categoryArray[i].text + " "  + tag.text;

           axios.post("https://search.findmanual.guru/manual/search/insert/", obj)
               .then(data => console.log("ok " + index))
               .catch(e => console.log(e));
       })

   }

}

parseData(workerData.url).then();
