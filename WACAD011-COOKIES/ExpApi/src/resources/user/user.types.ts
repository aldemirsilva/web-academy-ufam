import { type User } from "../../generated/prisma/client.js";

export type CreateUserDTO = Pick<
  User,
  "name" | "email" | "password" | "userTypeId"
>;

export type UserDTO = Omit<User, "password">;

export type UpdateUserDTO = Omit<CreateUserDTO, "password">;
