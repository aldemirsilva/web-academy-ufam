import Router from "express"
import ClientController from "../controllers/client"

const router = Router()

router.get("/clients", ClientController.index)
router.all("/clients/create", ClientController.create)
router.get("/clients/read/:cpf", ClientController.read)
router.all("/clients/update/:cpf", ClientController.update)
router.get("/clients/remove/:cpf", ClientController.remove)

router.use(ClientController.not_found)

export default router
