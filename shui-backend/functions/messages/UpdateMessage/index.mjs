import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { updateMessage } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateUpdateMessage } from '../../../validators/messages.mjs';

export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};
  const body = JSON.parse(event.body || '{}');
  const { message } = body;

  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }
  if (!message) {
    console.error("No message content provided in request body");
    return sendResponse(400, { message: 'Message content is required' });
  }
  const validationErrors = validateUpdateMessage(body);
  if (validationErrors.length > 0) {
    console.error("Validation errors:", validationErrors);
    return sendResponse(400, { message: 'Validation errors', errors: validationErrors });
  }
  const updatedMessage = await updateMessage(id, message);

  if (!updatedMessage) {
    console.error("Message not found for ID:", id);
    return sendResponse(404, { message: 'Message not found' });
  }
  console.log("Updated message:", updatedMessage);
  return sendResponse(200, updatedMessage);
})
  .use(errorHandler());