import type { Request, Response } from "express";
import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente,
} from "../cliente/cliente.service.js";
import type { CreateClienteDTO } from "./cliente.types.js";
import { StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  try {
    const clientes = await getClientes();
    return res.status(StatusCodes.OK).json(clientes);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const cliente = req.body as CreateClienteDTO;

  const dataNascimento = new Date(cliente.data_nascimento);

  if (Number.isNaN(dataNascimento.getTime())) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Data de nascimento inválida",
    });
  }

  try {
    const newCliente = await createCliente({
      ...cliente,
      data_nascimento: dataNascimento,
    });

    if (!newCliente) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Cliente já cadastrado.",
      });
    }

    return res.status(StatusCodes.CREATED).json(newCliente);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const cliente = await getCliente(id);
    return res.status(StatusCodes.OK).json(cliente);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { cpf: _cpf, ...cliente } = req.body as CreateClienteDTO;

  const dataNascimento = new Date(cliente.data_nascimento);

  if (Number.isNaN(dataNascimento.getTime())) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Data de nascimento inválida",
    });
  }

  try {
    const updatedCliente = await updateCliente(id, {
      ...cliente,
      data_nascimento: dataNascimento,
    });

    if (!updatedCliente) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Cliente não encontrado.",
      });
    }

    return res.status(StatusCodes.OK).json(updatedCliente);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const deletedCliente = await deleteCliente(id);

    if (!deletedCliente) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Cliente não encontrado.",
      });
    }

    return res.status(StatusCodes.OK).json({});
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default { index, create, read, update, remove };
