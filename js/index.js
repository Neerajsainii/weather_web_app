const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("../index.html", "utf-8");

const replaceVal = (tempVal,orgVal) => {
    let temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp);
    temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp_min);
    temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp_max);
    temperature = tempVal.replace("{%tempVal%}",orgVal.name);
    temperature = tempVal.replace("{%tempVal%}",orgVal.main.country);

    return temperature;
}

const server = http.createServer((req, res) => {
    var requests = require("requests");
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=kalyani&appid=c3834996fdea92c220ef99c40fad146f")
            .on('data', function (chunk) {
                const objJSON = JSON.parse(chunk);
                const arrData = [objJSON];
                // console.log(arrData);
                const realTimeData = arrData.map(val => replaceVal(homeFile,val)).join("");
                console.log(realTimeData);
                // res.write(realTimeData);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
            });
    }
    else{
        res.end("FILE IS NOT FOUND");
    }

});

server.listen(8000,"127.0.0.1");
