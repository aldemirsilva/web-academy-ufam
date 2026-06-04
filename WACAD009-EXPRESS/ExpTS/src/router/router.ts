import Router from "express"
import MainController from "../controllers/main"
import ProductController from "../controllers/products"

const router = Router()

// Main controller routes
router.get("/", MainController.index)
router.get("/about", MainController.about)
router.get("/bem-vindo/:nome", MainController.welcome)
router.get("/lorem/:paragrafos", MainController.lorem)
router.get("/hb1", MainController.hb1)
router.get("/hb2", MainController.hb2)
router.get("/hb3", MainController.hb3)
router.get("/hb4", MainController.hb4)

// Products controller routes
router.get("/products", ProductController.index)
router.all("/products/create", ProductController.create)
router.get("/products/read/:id", ProductController.read)
router.all("/products/update/:id", ProductController.update)
router.get("/products/remove/:id", ProductController.remove)

// Users controller routes

router.use(MainController.not_found)

export default router
