import express from "express";
import getEnv from "./utils/getEnv";
import logger from "./middlewares/logger/logger";
import router from "./router/router";

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(logger("complete"));

app.use("/img", express.static(`${process.cwd()}/public/img`));
app.use("/css", express.static(`${process.cwd()}/public/css`));
app.use("/js", express.static(`${process.cwd()}/public/js`));

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
