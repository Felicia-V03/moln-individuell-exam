import { sendResponse } from "../responses/index.mjs";
import { messageSchema } from "../models/messageSchema.mjs";

export const validateMessage = () => ({
  before: async (handler) => {
    const body = handler.event.body;

    const { error } = messageSchema.validate(body);

    if (error) {
      console.error('Validation error:', error.details[0].message);
      handler.response = sendResponse(400, { message: error.details[0].message });
      throw new Error('Validation failed');
    }

    handler.event.body = body;
  }
});