import { Router } from "express";
import userController from "./user.controller.js";

const router = Router();

router.get("/", userController.index);
router.post("/", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

export default router;
