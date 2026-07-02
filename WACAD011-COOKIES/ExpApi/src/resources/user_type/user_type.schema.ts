import Joi from "joi";

const UserTypeSchema = Joi.object().keys({
  label: Joi.string().min(3).max(50).required(),
});

export default UserTypeSchema;
