import { type PurchaseItem } from "../../generated/prisma/client.js";

export type CreatePurchaseItemDTO = Pick<
  PurchaseItem,
  "purchaseId" | "productId" | "quantity"
>;

export type UpdatePurchaseItemDTO = CreatePurchaseItemDTO;

export type DeletePurchaseItemDTO = Pick<
  CreatePurchaseItemDTO,
  "purchaseId" | "productId"
>;

export type ReadPurchaseItemDTO = DeletePurchaseItemDTO;
