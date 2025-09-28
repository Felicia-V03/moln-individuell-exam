import { sendResponse } from "../responses/index.mjs";
import { messageSchema } from "../models/messageSchema.mjs";

// middleware för att validera meddelandedata
export const validateMessage = () => ({
  before: async (handler) => {
    const body = handler.event.body;

    // kontrollera att body finns
    const { error } = messageSchema.validate(body);

    // kasta fel om validering misslyckas
    if (error) {
      console.error('Validation error:', error.details[0].message);
      handler.response = sendResponse(400, { message: error.details[0].message });
      throw new Error('Validation failed');
    }

    handler.event.body = body;
  }
});