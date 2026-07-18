import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller.js";
import validate from "../../middlewares/validate.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  createPurchaseItemSchema,
  deletePurchaseItemSchema,
  readPurchaseItemSchema,
  updatePurchaseItemSchema,
} from "./purchaseItem.schema.js";

const router = Router();

/**
 * @openapi
 * /purchase-items:
 *   get:
 *     summary: Lista todos os itens de compra
 *     tags: [PurchaseItems]
 *     responses:
 *       200:
 *         description: Lista de itens de compra
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 */
router.get("/", purchaseItemController.index);

/**
 * @openapi
 * /purchase-items:
 *   post:
 *     summary: Cria um novo item de compra
 *     tags: [PurchaseItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePurchaseItem'
 *     responses:
 *       201:
 *         description: Item de compra criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseItem'
 *       403:
 *         description: Usuário não é administrador
 */
router.post(
  "/",
  isAdmin,
  validate(createPurchaseItemSchema),
  purchaseItemController.create,
);

/**
 * @openapi
 * /purchase-items/read:
 *   post:
 *     summary: Busca um item de compra pelo purchaseId e productId
 *     tags: [PurchaseItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [purchaseId, productId]
 *             properties:
 *               purchaseId:
 *                 type: string
 *                 format: uuid
 *               productId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Item de compra encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseItem'
 *       404:
 *         description: Item de compra não encontrado
 */
router.post("/read", validate(readPurchaseItemSchema), purchaseItemController.read);

/**
 * @openapi
 * /purchase-items:
 *   put:
 *     summary: Atualiza um item de compra
 *     tags: [PurchaseItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePurchaseItem'
 *     responses:
 *       200:
 *         description: Item de compra atualizado
 *       403:
 *         description: Usuário não é administrador
 */
router.put(
  "/",
  isAdmin,
  validate(updatePurchaseItemSchema),
  purchaseItemController.update,
);

/**
 * @openapi
 * /purchase-items:
 *   delete:
 *     summary: Remove um item de compra
 *     tags: [PurchaseItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeletePurchaseItem'
 *     responses:
 *       200:
 *         description: Item de compra removido
 *       403:
 *         description: Usuário não é administrador
 */
router.delete(
  "/",
  isAdmin,
  validate(deletePurchaseItemSchema),
  purchaseItemController.remove,
);

export default router;
