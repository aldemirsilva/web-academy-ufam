import fs from "fs";
import http from "http";
import dotenv from "dotenv";
import links from "./utils/links.js";

dotenv.config({
  quiet: true,
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

const FOLDER = process.argv[2];
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    fs.readdir(`${FOLDER}`, (err, files) => {
      files.forEach((f) => res.write(links.createLink(f)));
      console.log(files);
      res.end();
    });
  } else {
    if (req.url === "/favicon.ico") {
      return res.end("favicon.ico");
    }
    fs.readFile(`${FOLDER}/${req.url}`, "utf-8", (err, content) => {
      const backLink = links.createBackLink();
      const htmlWithBackLink = `${backLink}${content}`;
      res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
      res.end(htmlWithBackLink);
    });
  }
});

server.listen(PORT);
