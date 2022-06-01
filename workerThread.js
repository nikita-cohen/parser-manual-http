const axios = require("axios");
const cheerio = require('cheerio');
const {workerData, parentPort} = require("worker_threads");

console.log("here")

let userAgent = [{'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246', 'Accept-Language' : '*'}
    , {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; CrOS i686 1660.57.0) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.46 Safari/535.19", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; AMD Mac OS X 10_8_2) AppleWebKit/535.22 (KHTML, like Gecko) Chrome/18.6.872", 'Accept-Language' : '*'},
    {'User-Agent' : "APIs-Google (+https://developers.google.com/webmasters/APIs-Google.html)", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/18.6.872.0 Safari/535.2 UNTRUSTED/1.0 3gpp-gba UNTRUSTED/1.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1041.0 Safari/535.21", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.22 (KHTML, like Gecko) Chrome/19.0.1047.0 Safari/535.22", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; FreeBSD amd64) AppleWebKit/536.5 (KHTML like Gecko) Chrome/19.0.1084.56 Safari/1EA69", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows ME 4.9; rv:35.0) Gecko/20100101 Firefox/35.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.66.18) Gecko/20177177 Firefox/45.66.18", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20120121 Firefox/46.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.10; rv:62.0) Gecko/20100101 Firefox/49.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9a1) Gecko/20060814 Firefox/51.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11;  Ubuntu; Linux i686; rv:52.0) Gecko/20100101 Firefox/52.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Ubuntu i686; rv:52.0) Gecko/20100101 Firefox/52.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:52.59.12) Gecko/20160044 Firefox/52.59.12", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 5.0; Windows NT 5.1; Windows NT 6.0; Windows NT 6.1; Linux; es-VE; rv:52.9.0) Gecko/20100101 Firefox/52.9.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/58.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/58.0.1", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.13; ko; rv:1.9.1b2) Gecko/20081201 Firefox/60.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:10.0) Gecko/20100101 Firefox/62.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.10; rv:62.0) Gecko/20100101 Firefox/62.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:63.0) Gecko/20100101 Firefox/63.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Linux i586; rv:63.0) Gecko/20100101 Firefox/63.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 6.1; rv:68.7) Gecko/20100101 Firefox/68.7", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:69.2.1) Gecko/20100101 Firefox/69.2", 'Accept-Language' : '*'},
    {'User-Agent' : "Mozilla/5.0 (Windows; U; Windows NT 9.1; en-US; rv:12.9.1.11) Gecko/20100821 Firefox/70", 'Accept-Language' : '*'}
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
    console.log("here 2")
   const {data} = await axios.get(url, hostObj[Math.floor(Math.random() * hostObj.length)]).catch(console.log)

   const $ = cheerio.load(data);
   const obj = {};

   const header = $('h1.Uheader');

   obj.brand = $(header[0]).text();

   const category = $('div.cathead');
   const categoryArray = [];

   for (let i = 0; i < category.length; i++) {
       categoryArray.push({"href":  $(category[i]).children("a").attr('href'), "text": $(category[i]).children("a").text().replace(/[^a-zA-Z0-9 ]/g, '').trim()})
   }
    console.log("here 3")
   for (let i = 0; i < categoryArray.length; i++) {
       obj.category = categoryArray[i].text;
       const dataTwo = await axios.get("https://www.manualslib.com" + categoryArray[i].href, hostObj[Math.floor(Math.random() * hostObj.length)]).catch(console.log)
       const cher = cheerio.load(dataTwo.data);

       console.log("here 4")

       const aTag = cher('div.col-sm-2.mname')
       const aTagArray = [];


       for (let j = 0 ; j < aTag.length; j++) {
           aTagArray.push({"href":  $(aTag[j]).children("a").attr('href'), "text": $(aTag[j]).children("a").text().replace(/[^a-zA-Z0-9 ]/g, '').trim()})
       }

       console.log("here 5")

       aTagArray.forEach((tag, index) => {
           obj.url = "https://www.manualslib.com" + tag.href;
           obj.title = obj.brand + " " + categoryArray[i].text + " "  + tag.text;

           axios.post("https://search.findmanual.guru/manual/search/insert/", obj)
               .then(data => console.log("ok " + index))
               .catch(e => console.log(e));
       })

   }
   parentPort.postMessage("done");

}

parseData(workerData.url).then();

parentPort.on('message' , async (m) => {
    if (m.message === "run") {
        await parseData(m.data.url)
        parentPort.postMessage("done");
    }
})
