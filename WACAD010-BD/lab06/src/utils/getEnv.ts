import { cleanEnv, port, str, url } from "envalid"
import dotenv from "dotenv"

dotenv.config({
  quiet: true,
})

const getEnv = () => {
  return cleanEnv(process.env, {
    PORT: port({ default: 9000 }),
    API_PATH: str(),
    DATABASE_URL: url(),
  })
}

export default getEnv
