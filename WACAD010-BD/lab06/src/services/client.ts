import { type cliente } from "../generated/prisma/browser.js"
import { prisma } from "../utils/prismaClient.js"
import { type CreateClienteDTO } from "../types/client.js"

export async function getClients(): Promise<cliente[]> {
  return await prisma.cliente.findMany()
}

export async function createClient(
  data: CreateClienteDTO,
): Promise<cliente | null> {
  const cliente = await prisma.cliente.findFirst({
    where: { nome_completo: data.nome_completo },
  })
  if (cliente) return null
  return await prisma.cliente.create({ data })
}

export async function getClient(cpf: string): Promise<cliente | null> {
  return await prisma.cliente.findUnique({ where: { cpf } })
}

export async function updateClient(
  cpf: string,
  data: Omit<CreateClienteDTO, "cpf">,
): Promise<cliente | null> {
  const clienteExistente = await prisma.cliente.findUnique({
    where: { cpf },
  })

  if (!clienteExistente) return null

  return await prisma.cliente.update({
    where: { cpf },
    data,
  })
}

export async function deleteClient(cpf: string): Promise<cliente | null> {
  const clienteExistente = await prisma.cliente.findUnique({
    where: { cpf },
  })

  if (!clienteExistente) return null

  return await prisma.cliente.delete({
    where: { cpf },
  })
}
