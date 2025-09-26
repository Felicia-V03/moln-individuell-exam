import { sendResponse } from "../responses/index.mjs";

export const validateMessage = () => {
  return {
    before: async (request) => {
      const body = request.event.body;

      if (!body || !body.message || typeof body.message !== 'string' || body.message.trim() === '') {
        throw sendResponse(400, { message: 'Invalid message format' });
      }
    }
  };
};