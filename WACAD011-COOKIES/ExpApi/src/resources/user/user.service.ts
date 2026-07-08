import { genSalt, hash } from "bcryptjs";
import { prisma } from "../../utils/prismaClient.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { CreateUserDTO, UpdateUserDTO, UserDTO } from "./user.types.js";
import getEnv from "../../utils/validateEnv.js";

const env = getEnv();

export async function getUsers(): Promise<UserDTO[]> {
  const users = await prisma.user.findMany();
  return users.map(
    ({ password, ...userWithoutPassword }) => userWithoutPassword,
  );
}

export async function findUserByEmail(email: string): Promise<UserDTO | null> {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function createUser(data: CreateUserDTO): Promise<UserDTO> {
  try {
    const salt = await genSalt(env.ROUNDS_BCRYPT);
    const passwordHash = await hash(data.password, salt);
    const { password, ...userWithoutPassword } = await prisma.user.create({
      data: { ...data, password: passwordHash },
    });
    return userWithoutPassword;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Email already in use");
    }
    throw error;
  }
}

export async function getUser(id: string): Promise<UserDTO | null> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error("Invalid user ID format");
    }
    throw error;
  }
}

export async function updateUser(
  id: string,
  data: UpdateUserDTO,
): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return null;

  try {
    const { password, ...userWithoutPassword } = await prisma.user.update({
      where: { id },
      data,
    });
    return userWithoutPassword;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("User not found");
    }
    throw error;
  }
}

export async function deleteUser(id: string): Promise<UserDTO | null> {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    const { password, ...userWithoutPassword } = await prisma.user.delete({
      where: { id },
    });

    return userWithoutPassword;
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
