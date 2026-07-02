import { Router } from "express";
import userTypeController from "../user_type/user_type.controller.js";
import userTypeSchema from "../user_type/user_type.schema.js";
import validate from "../../middlewares/validate.js";

const router = Router();

router.get("/", userTypeController.index);
router.post("/", validate(userTypeSchema), userTypeController.create);
router.get("/:id", userTypeController.read);
router.put("/:id", validate(userTypeSchema), userTypeController.update);
router.delete("/:id", userTypeController.remove);

export default router;
