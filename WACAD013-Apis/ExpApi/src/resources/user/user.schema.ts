import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
  userTypeId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(100).required(),
  userTypeId: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
}).required();
