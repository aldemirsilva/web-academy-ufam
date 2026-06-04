import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express"
import getEnv from "./utils/getEnv"
import logger from "./middlewares/logger/logger"
import router from "./router/router"
import { engine } from "express-handlebars"
import helpers from "./helpers/helpers"

const app = express()
const env = getEnv()
const PORT = env.PORT

app.engine("handlebars", engine({ helpers: helpers }))
app.set("view engine", "handlebars")

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.info = "Alguma informação"
  next()
})

app.use(logger("complete"))

app.use("/img", express.static(`${process.cwd()}/public/img`))
app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/js", express.static(`${process.cwd()}/public/js`))

app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
