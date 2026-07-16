import type { Purchase } from "../../generated/prisma/client.js";

export type CreatePurchaseDTO = Pick<Purchase, "userId">;
