import { genSalt, hash } from "bcryptjs";
import { prisma } from "../../utils/prismaClient.js";
import { Prisma, type User } from "../../generated/prisma/client.js";
import type { CreateUserDTO, UpdateUserDTO, UserDTO } from "./user.types.js";
import getEnv from "../../utils/validateEnv.js";

const env = getEnv();

function toUserDTO(user: User): UserDTO {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function ensureUserTypeExists(userTypeId: string): Promise<void> {
  const userType = await prisma.userType.findUnique({
    where: { id: userTypeId },
  });

  if (!userType) {
    throw new Error("User type not found");
  }
}

export async function getUsers(): Promise<UserDTO[]> {
  const users = await prisma.user.findMany();
  return users.map(toUserDTO);
}

export async function findUserByEmail(email: string): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  return toUserDTO(user);
}

export async function createUser(data: CreateUserDTO): Promise<UserDTO> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    await ensureUserTypeExists(data.userTypeId);

    const salt = await genSalt(env.ROUNDS_BCRYPT);
    const passwordHash = await hash(data.password, salt);
    const user = await prisma.user.create({
      data: { ...data, password: passwordHash },
    });

    return toUserDTO(user);
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
    return toUserDTO(user);
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

  await ensureUserTypeExists(data.userTypeId);

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return toUserDTO(updatedUser);
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

export async function deleteUser(id: string): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return null;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return toUserDTO(deletedUser);
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
