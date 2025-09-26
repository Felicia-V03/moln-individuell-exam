import { sendResponse } from "../responses/index.mjs";

export const validateMessage = () => ({
  before: async (handler) => {
    const body = handler.event.body;

    if (!body || !body.message || typeof body.message !== 'string' || body.message.trim() === '') {
      throw sendResponse(400, { message: 'Invalid message format' });
    }
  }
});