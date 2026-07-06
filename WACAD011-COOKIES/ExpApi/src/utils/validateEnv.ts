import { cleanEnv, port, url, num } from "envalid";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 7777 }),
    DATABASE_URL: url(),
    ROUNDS_BCRYPT: num({ default: 10 }),
  });
}

export default getEnv;
