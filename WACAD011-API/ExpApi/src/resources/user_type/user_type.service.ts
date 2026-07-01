import type { UserType } from "../../generated/prisma/client.js";
import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import type { CreateUserTypeDTO } from "./user_type.types.js";

export async function getUserTypes(): Promise<UserType[]> {
  return await prisma.userType.findMany();
}

export async function createUserType(
  data: CreateUserTypeDTO,
): Promise<UserType | null> {
  try {
    return await prisma.userType.create({ data });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return null;
    }
    throw e;
  }
}

export async function getUserType(id: string): Promise<UserType | null> {
  return prisma.userType.findUnique({ where: { id } });
}

export async function updateUserType(
  id: string,
  data: CreateUserTypeDTO,
): Promise<UserType | null> {
  const user_type = await prisma.userType.findUnique({ where: { id } });

  if (!user_type) return null;

  try {
    return await prisma.userType.update({ where: { id }, data });
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

export async function deleteUserType(
  id: string,
): Promise<CreateUserTypeDTO | null> {
  const user_type = await prisma.userType.findUnique({ where: { id } });

  if (!user_type) return null;

  try {
    return await prisma.userType.delete({ where: { id } });
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
