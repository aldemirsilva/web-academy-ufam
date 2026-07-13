import type { LoginDTO } from "./auth.types.js";
import { compare } from "bcryptjs";
import { prisma } from "../../utils/prismaClient.js";
import type { UserDTO } from "../user/user.types.js";
import { toUserDTO } from "../user/user.service.js";

export async function checkCredentials(
  data: LoginDTO,
): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  const ok = await compare(data.password, user ? user.password : "FAKEHASH");
  if (!ok) return null;

  return user ? toUserDTO(user) : null;
}
