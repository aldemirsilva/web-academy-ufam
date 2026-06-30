import type { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.json([]);
};

const create = (req: Request, res: Response) => {
  res.send("Oi!");
};

const read = (req: Request, res: Response) => {};
const update = (req: Request, res: Response) => {};
const remove = (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
