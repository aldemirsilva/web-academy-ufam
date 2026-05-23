import fs from "fs/promises";
import http from "http";
import { URL } from "url";
import { loremIpsum } from "lorem-ipsum";
import dotenv from "dotenv";

dotenv.config({
  quiet: true,
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? `localhost:${PORT}`}`,
  );

  if (requestUrl.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    const partial1 = await fs.readFile("public/html/partial1.html");
    const partial2 = await fs.readFile("public/html/partial2.html");
    res.write(partial1);
    res.write(partial2);
    res.end();
  } else if (requestUrl.pathname === "/lorem") {
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
    const partial1 = await fs.readFile("public/html/partial1.html");
    const paragraphCount = parseInt(requestUrl.searchParams.get("qtd"));
    const lorem = loremIpsum({
      count: paragraphCount,
      format: "html",
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
      random: Math.random,
      sentenceLowerBound: 5,
      sentenceUpperBound: 15,
      suffix: "\n",
      units: "paragraphs",
    });
    const partial2 = await fs.readFile("public/html/partial2.html");
    res.write(partial1);
    res.write(lorem);
    res.write(partial2);
    res.end();
  } else if (requestUrl.pathname === "/style.css") {
    const css = await fs.readFile("public/css/style.css");
    res.writeHead(200, { "content-type": "text/css;charset=utf-8" });
    res.write(css);
    res.end();
  } else {
    res.end();
  }
});

server.listen(PORT);
