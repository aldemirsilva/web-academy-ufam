import Router from "express"
import MainController from "../controllers/main"
import ProductController from "../controllers/products"
import ClientController from "../controllers/client"

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

// Clients controller routes
router.get("/clients", ClientController.index)
router.post("/clients", ClientController.create)
router.get("/clients/:id", ClientController.read)
router.put("/clients/:id", ClientController.update)
router.delete("/clients/:id", ClientController.remove)

router.use(MainController.not_found)

export default router
