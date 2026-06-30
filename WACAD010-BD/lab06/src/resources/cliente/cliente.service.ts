import { type cliente } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import { type CreateClienteDTO } from "./cliente.types.js";

export async function getClientes(): Promise<cliente[]> {
  return await prisma.cliente.findMany();
}

export async function createCliente(
  data: CreateClienteDTO,
): Promise<cliente | null> {
  const cliente = await prisma.cliente.findFirst({
    where: { nome_completo: data.nome_completo },
  });
  if (cliente) return null;
  return await prisma.cliente.create({ data });
}

export async function getCliente(cpf: string): Promise<cliente | null> {
  return await prisma.cliente.findUnique({ where: { cpf } });
}

export async function updateCliente(
  cpf: string,
  data: Omit<CreateClienteDTO, "cpf">,
): Promise<cliente | null> {
  const clienteExistente = await prisma.cliente.findUnique({
    where: { cpf },
  });

  if (!clienteExistente) return null;

  return await prisma.cliente.update({
    where: { cpf },
    data,
  });
}

export async function deleteCliente(cpf: string): Promise<cliente | null> {
  const clienteExistente = await prisma.cliente.findUnique({
    where: { cpf },
  });

  if (!clienteExistente) return null;

  return await prisma.cliente.delete({
    where: { cpf },
  });
}
