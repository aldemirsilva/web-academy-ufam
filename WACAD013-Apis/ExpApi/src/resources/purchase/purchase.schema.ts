import Joi from "joi";

export const createPurchaseSchema = Joi.object({
  userId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();

export const updatePurchaseSchema = Joi.object({
  userId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();
