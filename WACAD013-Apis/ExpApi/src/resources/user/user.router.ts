import { Router } from "express";
import userController from "./user.controller.js";
import validate from "../../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "./user.schema.js";

const router = Router();

router.get("/", userController.index);
router.post("/", validate(createUserSchema), userController.create);
router.get("/:id", userController.read);
router.put("/:id", validate(updateUserSchema), userController.update);
router.delete("/:id", userController.remove);

export default router;
