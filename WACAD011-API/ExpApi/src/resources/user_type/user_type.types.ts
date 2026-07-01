import { type UserType } from "../../generated/prisma/client.js";

export type CreateUserTypeDTO = Pick<UserType, "label">;
