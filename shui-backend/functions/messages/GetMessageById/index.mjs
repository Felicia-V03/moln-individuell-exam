import middy from '@middy/core';
import { sendResponse } from "../../../responses/index.mjs";
import { getMessageById } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';

export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};

  // id måste finnas
  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }

  // hämta meddelande med id
  const message = await getMessageById(id);

  // returnera svar när meddelande inte finns
  if (!message) {
    console.error("Message not found for ID:", id);
    return sendResponse(404, { message: 'Message not found' });
  }

  // returnera meddelande
  console.log("Fetched message:", message);
  return sendResponse(200, message);
})
  .use(errorHandler());