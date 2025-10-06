import Joi from "joi";

// schema för inloggningsdata
export const loginSchema = Joi.object({
  username : Joi.string().alphanum().min(6).required(),
  password : Joi.string().required()
});