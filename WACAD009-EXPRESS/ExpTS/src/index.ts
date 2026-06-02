import express, { type Request, type Response } from "express";
import getEnv from "./utils/getEnv";
import logger from "./middlewares/logger/logger";

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(logger("complete"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
