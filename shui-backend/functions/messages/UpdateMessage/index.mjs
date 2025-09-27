import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { updateMessage } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';

export const handler = middy(async (event) => {
  const { username } = event.user;
  const { id } = event.pathParameters || {};
  const { message } = JSON.parse(event.body || '{}');

  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }
  if (!message) {
    console.error("No message content provided in request body");
    return sendResponse(400, { message: 'Message content is required' });
  }
  
  const updatedMessage = await updateMessage(username, id, message);

  if (!updatedMessage) {
    console.error("Message not found or could not be updated for ID:", id);
    return sendResponse(404, { message: 'Message not found or could not be updated' });
  }

  console.log("Updated message:", updatedMessage);
  return sendResponse(200, updatedMessage);
})
  .use(errorHandler());