import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config({
  quiet: true,
  path: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
});

const getEnv = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["development", "production", "test"] }),
    PORT: port({ default: 3000 }),
    LOGGER_PATH: str({ default: "logs" }),
  });
};

export default getEnv;
