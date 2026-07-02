import { type Product, Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import { type CreateProductDTO } from "./product.types.js";

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function createProduct(data: CreateProductDTO): Promise<Product> {
  return await prisma.product.create({ data });
}

export async function getProduct(id: string): Promise<Product | null> {
  return await prisma.product.findUnique({ where: { id } });
}

export async function updateProduct(
  id: string,
  data: CreateProductDTO,
): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return null;

  try {
    return await prisma.product.update({ where: { id }, data });
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

export async function deleteProduct(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return null;

  try {
    return await prisma.product.delete({ where: { id } });
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
