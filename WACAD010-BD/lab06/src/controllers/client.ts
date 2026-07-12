import type { Request, Response } from "express"
import type { CreateClienteDTO } from "../types/client"
import { StatusCodes } from "http-status-codes"
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "../services/client"

const index = async (req: Request, res: Response) => {
  try {
    const clients = await getClients()
    return res.status(StatusCodes.OK).render("clients/index", {
      clients,
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("clients/create")
  } else if (req.method === "POST") {
    const client = req.body as CreateClienteDTO

    const dataNascimento = new Date(client.data_nascimento)

    if (Number.isNaN(dataNascimento.getTime())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Data de nascimento inválida",
      })
    }

    try {
      const newCliente = await createClient({
        ...client,
        data_nascimento: dataNascimento,
      })

      if (!newCliente) {
        return res.status(StatusCodes.CONFLICT).json({
          error: "Cliente já cadastrado.",
        })
      }

      return res.status(StatusCodes.CREATED).redirect("/clients")
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
    }
  }
}

const read = async (req: Request, res: Response) => {
  const cpf = req.params.cpf as string
  try {
    const client = await getClient(cpf)
    return res.status(StatusCodes.OK).render("clients/read", {
      client,
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

const update = async (req: Request, res: Response) => {
  const cpf = req.params.cpf as string
  if (req.method === "GET") {
    const client = await getClient(cpf)
    res.render("clients/update", {
      client,
    })
  } else if (req.method === "POST") {
    const client = req.body as CreateClienteDTO

    const dataNascimento = new Date(client.data_nascimento)

    if (Number.isNaN(dataNascimento.getTime())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Data de nascimento inválida",
      })
    }

    try {
      const updatedCliente = await updateClient(cpf, {
        ...client,
        data_nascimento: dataNascimento,
      })

      if (!updatedCliente) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Cliente não encontrado.",
        })
      }

      return res.status(StatusCodes.OK).redirect("/clients")
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}

const remove = async (req: Request, res: Response) => {
  const cpf = req.params.cpf as string

  try {
    const deletedCliente = await deleteClient(cpf)

    if (!deletedCliente) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Cliente não encontrado.",
      })
    }

    return res.status(StatusCodes.OK).redirect("/clients")
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const not_found = (req: Request, res: Response) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .send("<h1>Erro 404: Página não encontrada.</h1>")
}

export default { index, create, read, update, remove, not_found }
