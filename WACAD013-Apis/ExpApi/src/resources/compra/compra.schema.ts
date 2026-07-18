import Joi from "joi";

export const addToCartSchema = Joi.object({
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();

export const removeFromCartSchema = Joi.object({
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();

export const updateQuantitySchema = Joi.object({
  productId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  quantity: Joi.number().integer().min(1).required(),
}).required();
