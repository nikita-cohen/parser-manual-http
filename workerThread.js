const axios = require("axios");
const cheerio = require('cheerio');
const {workerData} = require("worker_threads");
const http = require("http");

async function parseData(url) {
   const {data} = await axios.get(url, { headers : { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36', 'Accept-Language' : '*'}})
   const $ = cheerio.load(data);
   const obj = {};

   const instance = axios.create({
       timeout: 10000000,
       httpAgent: new http.Agent({ keepAlive: true }),
   })

   const header = $('h1.Uheader');

   obj.brand = $(header[0]).text();

   const category = $('div.cathead');
   const categoryArray = [];

   for (let i = 0; i < category.length; i++) {
       categoryArray.push({"href":  $(category[i]).children("a").attr('href'), "text": $(category[i]).children("a").text().replace(/[^a-zA-Z0-9 ]/g, '').trim()})
   }

   for (let i = 0; i < categoryArray.length; i++) {
       obj.category = categoryArray[i].text;
       const dataTwo = await axios.get("https://www.manualslib.com" + categoryArray[i].href, { headers : { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36', 'Accept-Language' : '*'}})
       const cher = cheerio.load(dataTwo.data);

       const aTag = cher('div.col-sm-2.mname')
       const aTagArray = [];


       for (let j = 0 ; j < aTag.length; j++) {
           aTagArray.push({"href":  $(aTag[j]).children("a").attr('href'), "text": $(aTag[j]).children("a").text().replace(/[^a-zA-Z0-9 ]/g, '').trim()})
       }

       aTagArray.forEach((tag, index) => {
           obj.url = "https://www.manualslib.com" + tag.href;
           obj.title = obj.brand + " " + categoryArray[i].text + " "  + tag.text;

           instance.post("https://search.findmanual.guru/manual/search/insert/" , obj)
               .then(data => console.log("ok " + index))
               .catch(e => console.log(e));
       })

   }

}

parseData(workerData.url).then();
