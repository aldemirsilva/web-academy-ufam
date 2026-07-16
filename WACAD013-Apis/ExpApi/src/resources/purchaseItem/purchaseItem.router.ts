import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller.js";
import validate from "../../middlewares/validate.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  createPurchaseItemSchema,
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
 * /purchase-items/{purchaseId}/{productId}:
 *   get:
 *     summary: Busca um item de compra pelo purchaseId e productId
 *     tags: [PurchaseItems]
 *     parameters:
 *       - name: purchaseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
router.get("/:purchaseId/:productId", purchaseItemController.read);

/**
 * @openapi
 * /purchase-items/{purchaseId}/{productId}:
 *   put:
 *     summary: Atualiza um item de compra
 *     tags: [PurchaseItems]
 *     parameters:
 *       - name: purchaseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
  "/:purchaseId/:productId",
  isAdmin,
  validate(updatePurchaseItemSchema),
  purchaseItemController.update,
);

/**
 * @openapi
 * /purchase-items/{purchaseId}/{productId}:
 *   delete:
 *     summary: Remove um item de compra
 *     tags: [PurchaseItems]
 *     parameters:
 *       - name: purchaseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Item de compra removido
 *       403:
 *         description: Usuário não é administrador
 */
router.delete(
  "/:purchaseId/:productId",
  isAdmin,
  purchaseItemController.remove,
);

export default router;
