import { cleanEnv, port, str } from "envalid";
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["development", "production", "test"] }),
    PORT: port({ default: 3000 }),
  });
};
export default validateEnv;
