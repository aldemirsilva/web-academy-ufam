import { type cliente } from "../generated/prisma/client"

export type CreateClienteDTO = Pick<
  cliente,
  "cpf" | "nome_completo" | "celular" | "e_mail" | "data_nascimento"
>
