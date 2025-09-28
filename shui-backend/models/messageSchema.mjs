import Joi from 'joi';

// schema för meddelandedata
export const messageSchema = Joi.object({
  message: Joi.string().min(1).max(500).required(),
});