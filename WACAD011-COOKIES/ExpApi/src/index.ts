import express from "express";
import getEnv from "./utils/validateEnv.js";
import router from "./router/index.js";
import cookieParser from "cookie-parser";
import setCookieLang from "./middlewares/setCookieLang.js";

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(setCookieLang);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
