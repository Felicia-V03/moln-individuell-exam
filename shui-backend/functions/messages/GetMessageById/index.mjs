import middy from '@middy/core';
import { sendResponse } from "../../../responses/index.mjs";
import { getMessageById } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';

export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};

  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }

  const message = await getMessageById(id);

  if (!message) {
    console.error("Message not found for ID:", id);
    return sendResponse(404, { message: 'Message not found' });
  }

  console.log("Fetched message:", message);
  return sendResponse(200, message);
})
  .use(errorHandler());