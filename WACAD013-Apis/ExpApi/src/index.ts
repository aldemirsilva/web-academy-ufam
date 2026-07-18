import express from "express";
import getEnv from "./utils/validateEnv.js";
import router from "./router/index.js";
import cookieParser from "cookie-parser";
import setCookieLang from "./middlewares/setCookieLang.js";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();
const env = getEnv();
const PORT = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(setCookieLang);

app.use(
  session({
    genid: () => uuidv4(),
    secret: env.SESSION_SECRET,
    resave: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: !!(process.env.NODE_ENV !== "production"),
    },
    saveUninitialized: true,
  }),
);

app.use((req, _res, next) => {
  req.session.cart ??= [];
  next();
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
