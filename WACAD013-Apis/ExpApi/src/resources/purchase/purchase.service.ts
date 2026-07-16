import { Prisma, type Purchase } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import type { CreatePurchaseDTO } from "./purchase.types.js";

export async function getPurchases(): Promise<Purchase[]> {
  return await prisma.purchase.findMany();
}

export async function createPurchase(
  data: CreatePurchaseDTO,
): Promise<Purchase> {
  return await prisma.purchase.create({ data });
}

export async function getPurchase(id: string): Promise<Purchase | null> {
  return await prisma.purchase.findUnique({ where: { id } });
}

export async function updatePurchase(id: string, data: CreatePurchaseDTO) {
  const purchase = await prisma.purchase.findUnique({ where: { id } });

  if (!purchase) return null;
  try {
    return await prisma.purchase.update({
      where: { id },
      data,
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      return null;
    }
    throw e;
  }
}

export async function deletePurchase(id: string): Promise<Purchase | null> {
  const purchase = await prisma.purchase.findUnique({ where: { id } });
  if (!purchase) return null;

  try {
    return await prisma.purchase.delete({ where: { id } });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      return null;
    }
    throw e;
  }
}
