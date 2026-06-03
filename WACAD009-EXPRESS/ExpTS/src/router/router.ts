import Router from "express"
import MainController from "../controllers/main"

const router = Router()

router.get("/", MainController.index)
router.get("/about", MainController.about)
router.get("/bem-vindo/:nome", MainController.welcome)
router.get("/lorem/:paragrafos", MainController.lorem)
router.get("/hb1", MainController.hb1)
router.get("/hb2", MainController.hb2)
router.get("/hb3", MainController.hb3)
router.get("/hb4", MainController.hb4)
router.use(MainController.not_found)

export default router
