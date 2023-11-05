const http = require("http");
const fs = require("fs");

const homeFile = fs.readFileSync("index.html", "utf-8");

const server = http.createServer((req, res) => {
    var requests = require("requests");
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=kota&appid=c3834996fdea92c220ef99c40fad146f")
            .on('data', function (chunk) {
                const objJSON = JSON.parse(chunk);
                const arrData = [objJSON];
                console.log(arrData);
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
