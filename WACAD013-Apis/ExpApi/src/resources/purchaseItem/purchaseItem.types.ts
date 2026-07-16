import { type PurchaseItem } from "../../generated/prisma/client.js";

export type CreatePurchaseItemDTO = Pick<
  PurchaseItem,
  "purchaseId" | "productId" | "quantity"
>;

export type UpdatePurchaseItemDTO = Pick<PurchaseItem, "quantity">;
