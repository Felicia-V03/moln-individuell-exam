import Joi from 'joi';

// schema för meddelandedata
export const messageSchema = Joi.object({
  title: Joi.string().min(1).max(40).required(),
  message: Joi.string().min(1).max(500).required(),
});