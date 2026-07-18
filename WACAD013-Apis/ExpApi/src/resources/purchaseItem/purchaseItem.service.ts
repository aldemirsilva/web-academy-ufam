import { Prisma, type PurchaseItem } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import type {
  CreatePurchaseItemDTO,
  UpdatePurchaseItemDTO,
} from "./purchaseItem.types.js";

export async function getPurchaseItems(): Promise<PurchaseItem[]> {
  return await prisma.purchaseItem.findMany();
}

export async function createPurchaseItem(
  data: CreatePurchaseItemDTO,
): Promise<PurchaseItem> {
  return await prisma.purchaseItem.create({ data });
}

export async function createManyPurchaseItems(
  data: CreatePurchaseItemDTO[],
): Promise<PurchaseItem[]> {
  return await Promise.all(
    data.map((item) => prisma.purchaseItem.create({ data: item })),
  );
}

export async function getPurchaseItem({
  purchaseId,
  productId,
}: {
  purchaseId: string;
  productId: string;
}): Promise<PurchaseItem | null> {
  return await prisma.purchaseItem.findUnique({
    where: {
      purchaseId_productId: {
        purchaseId,
        productId,
      },
    },
  });
}

export async function updatePurchaseItem(
  data: UpdatePurchaseItemDTO,
): Promise<PurchaseItem | null> {
  const { purchaseId, productId, ...rest } = data;

  const purchaseItem = await prisma.purchaseItem.findUnique({
    where: {
      purchaseId_productId: {
        purchaseId,
        productId,
      },
    },
  });

  if (!purchaseItem) return null;

  try {
    return await prisma.purchaseItem.update({
      where: {
        purchaseId_productId: {
          purchaseId,
          productId,
        },
      },
      data: rest,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return null;
    }

    throw error;
  }
}

export async function deletePurchaseItem({
  purchaseId,
  productId,
}: {
  purchaseId: string;
  productId: string;
}): Promise<PurchaseItem | null> {
  const purchaseItem = await prisma.purchaseItem.findUnique({
    where: {
      purchaseId_productId: {
        purchaseId,
        productId,
      },
    },
  });

  if (!purchaseItem) return null;

  try {
    return await prisma.purchaseItem.delete({
      where: {
        purchaseId_productId: {
          purchaseId,
          productId,
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return null;
    }

    throw error;
  }
}
