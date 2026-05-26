const express = require("express");
const dotenv = require("dotenv");

dotenv.config({
  quiet: true,
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
