const fs = require("fs");
const http = require("http");

const FOLDER = process.argv[2];

const server = http.createServer((req, res) => {
  fs.readdir(FOLDER, (err, files) => {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    files.forEach((f) => res.write(`${f}<br>`));
    console.log(files);
    res.end();
  });
});

server.listen(3030);
