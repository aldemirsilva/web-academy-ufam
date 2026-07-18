import { Router } from "express";
import comprasController from "./compras.controller.js";

const router = Router();

router.get("/", comprasController.index);
router.post("/add-to-cart", comprasController.addToCart);
router.post("/remove-from-cart", comprasController.removeFromCart);
router.post("/update-quantity", comprasController.updateQuantity);
router.delete("/empty-cart", comprasController.emptyCart);
router.post("/place-order", comprasController.placeOrder);

export default router;
