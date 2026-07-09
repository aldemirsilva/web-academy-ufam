import type { LoginDTO } from "./auth.types.js";
import { type User } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import { compare } from "bcryptjs";

export async function checkCredentials(data: LoginDTO): Promise<User | null> {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  const ok = await compare(data.password, user ? user.password : "FAKEHASH");
  return ok ? user : null;
}
