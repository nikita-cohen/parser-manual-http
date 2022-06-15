const {Worker} = require("worker_threads");
const path = require("path");
const axios = require("axios");
const https = require("https");

let queue = [
    {url : "https://www.manualslib.com/brand/0.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/1.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/2.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/3.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/4.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/5.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/6.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/7.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/8.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/9.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html" , type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=2" , type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=7", type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=8", type : "brand"},
    {url : "https://www.manualslib.com/brand/A.html?page=9", type : "brand"},
    {url : "https://www.manualslib.com/brand/B.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/B.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/B.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/B.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/B.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/B.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/C.html?page=7", type : "brand"},
    {url : "https://www.manualslib.com/brand/D.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/D.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/D.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/D.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/E.html?page=1", type : "brand"},
    {url : "https://www.manualslib.com/brand/E.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/E.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/E.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/E.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/F.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/F.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/F.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/F.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/G.html?page=1", type : "brand"},
    {url : "https://www.manualslib.com/brand/G.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/G.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/G.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/G.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/H.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/H.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/H.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/H.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/H.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/I.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/I.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/I.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/J.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/J.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/K.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/K.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/L.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/L.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/L.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/L.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/M.html?page=7", type : "brand"},
    {url : "https://www.manualslib.com/brand/N.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/N.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/N.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/N.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/O.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/O.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/O.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/P.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/P.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/P.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/P.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/P.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/P.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/Q.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/R.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/R.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/R.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/R.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/R.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=7", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=8", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=9", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=10", type : "brand"},
    {url : "https://www.manualslib.com/brand/S.html?page=11", type : "brand"},
    {url : "https://www.manualslib.com/brand/T.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/T.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/T.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/T.html?page=4", type : "brand"},
    {url : "https://www.manualslib.com/brand/T.html?page=5", type : "brand"},
    {url : "https://www.manualslib.com/brand/T.html?page=6", type : "brand"},
    {url : "https://www.manualslib.com/brand/U.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/U.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/V.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/V.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/V.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/W.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/W.html?page=2", type : "brand"},
    {url : "https://www.manualslib.com/brand/W.html?page=3", type : "brand"},
    {url : "https://www.manualslib.com/brand/X.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/Y.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/Z.html", type : "brand"},
    {url : "https://www.manualslib.com/brand/Z.html?page=2", type : "brand"}
];
let dataForDb = [];
let isRunning = true;
const workers = [];
const AMOUNT = 40;

const instance = axios.create(
    {
        baseURL : "https://search.findmanual.guru/manual/search/insert",
        timeout : 60000,
        httpsAgent : new https.Agent({keepAlive : true})
    }
)

function createWorkers (patha) {
    for (let i = 0; i < AMOUNT; i++) {
        const w = new Worker(path.resolve(patha));
        workers.push({worker: w});
    }
}

function initWorker(url , idx) {
        const {worker} = workers[idx];
        worker.postMessage({message : "run" , url});

        worker.on('message',(message) => {
            if (message.message === "done" && message.isForDb === false) {
                if (queue.length > 0) {
                    queue = [...queue, ...message.result]
                    worker.postMessage({message : "run" , url : queue.shift()});
                }
            }

            if (message.message === "done" && message.isForDb === true) {
                dataForDb = [...dataForDb, ...message.result]
                if (queue.length > 0) {
                    worker.postMessage({message : "run" , url : queue.shift()});
                } else {
                    console.log(message);
                }
            }
        });


        worker.on('error', error => {
            console.log(error);
        })

        worker.on("exit", (code) => {
            if (code !== 0) console.log(new Error("something go wrong"));
        })
}

function loadArray() {
    for(let i = 0; i < 40; i++) {
        console.log(i)
        initWorker(queue.shift(), i);
    }
}

function initLoadingArray() {
    console.time('parsing_array');
    loadArray();
    console.timeEnd('parsing_array');
}

function insertToDb() {
    if(isRunning) {
        if (dataForDb.length >= 200) {
            const insertDataToDb = dataForDb.splice(0, 100);
            instance.post("https://search.findmanual.guru/manual/search/insert", {"data" : insertDataToDb})
                    .then(data => console.log("ok"))
                    .catch(e => console.log(e));
        }

        setTimeout(() => {
            insertToDb();
        }, 500)
    }
}

// function resetAtMidnight() {
//     let now = new Date();
//     let night = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate() + 1, // the next day, ...
//         0, 0, 0 // ...at 00:00:00 hours
//     );
//
//     let msToMidnight = night.getTime() - now.getTime();
//     setTimeout(async function() {
//         await initLoadingArray();            //  <-- This is the function being called at midnight.
//         resetAtMidnight();    //      Then, reset again next midnight.
//     }, msToMidnight);
// }

function init() {
    createWorkers('./workerThread.js')
    insertToDb();
    initLoadingArray();
}

init();

