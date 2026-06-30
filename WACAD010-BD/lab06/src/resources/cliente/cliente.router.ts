import { Router } from "express";
import clienteController from "./cliente.controller.js";

const router = Router();

router.get("/", clienteController.index);
router.post("/", clienteController.create);
router.get("/:id", clienteController.read);
router.put("/:id", clienteController.update);
router.delete("/:id", clienteController.remove);

export default router;
