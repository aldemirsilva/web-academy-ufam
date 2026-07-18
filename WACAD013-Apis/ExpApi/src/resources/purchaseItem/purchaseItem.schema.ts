import Joi from "joi";

export const createPurchaseItemSchema = Joi.object({
  purchaseId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();

export const updatePurchaseItemSchema = Joi.object({
  purchaseId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();

export const deletePurchaseItemSchema = Joi.object({
  purchaseId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();

export const readPurchaseItemSchema = Joi.object({
  purchaseId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();
