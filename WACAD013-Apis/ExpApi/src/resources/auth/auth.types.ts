import { type User } from "../../generated/prisma/client.js";

export type SignUpDTO = Pick<User, "name" | "email" | "password">;
export type LoginDTO = Omit<SignUpDTO, "name">;
