import express, { type Request, type Response } from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";

dotenv.config({
  quiet: true,
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
