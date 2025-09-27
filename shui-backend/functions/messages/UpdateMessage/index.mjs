import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { updateMessage } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
  const { username } = event.user || {};
  const { id } = event.pathParameters || {};
  const { message } = JSON.parse(event.body || '{}');

  if (!id) {
    return sendResponse(400, { message: 'Message ID is required' });
  }

  if (!message || message.trim() === '') {
    return sendResponse(400, { message: 'Message content is required' });
  }

  try {
    const updatedMessage = await updateMessage(username, id, message);

    if (!updatedMessage) {
      return sendResponse(404, { message: 'Message not found or could not be updated' });
    }

    return sendResponse(200, { message: 'Message updated successfully', updatedMessage });
  } catch (error) {
    console.error('Error in update handler:', error);
    return sendResponse(500, { message: 'Internal Server Error' });
  }
})
  .use(authenticateUser())
  .use(errorHandler());