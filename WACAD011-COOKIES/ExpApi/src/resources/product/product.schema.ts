import Joi from "joi";

const productSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).precision(2).required(),
  Stock: Joi.number().min(0).required(),
});

export default productSchema;
