import { Router } from "express";
import languageController from "./language.controller.js";
import validate from "../../middlewares/validate.js";
import languageSchema from "./language.schema.js";

const router = Router();

router.post("/", validate(languageSchema), languageController.changeLang);

export default router;
