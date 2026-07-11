import express from "express"
import getEnv from "./utils/getEnv"
import router from "./router/router"
import { engine } from "express-handlebars"

const app = express()
const env = getEnv()
const PORT = env.PORT

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
