import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { deleteMessage } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
  const { username } = event.user || {};
  const { id } = event.pathParameters || {};

  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }

  if (!username) {
    console.error("No username found in event user");
    return sendResponse(401, { message: 'Unauthorized' });
  }

  try {
    const deleted = await deleteMessage(username, id);

    if (!deleted) {
      console.error("Message not found or could not be deleted for ID:", id);
      return sendResponse(404, { message: 'Message not found or could not be deleted' });
    }

    console.log("Deleted message with ID:", id);
    return sendResponse(200, { message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error in delete handler:', error);
    return sendResponse(500, { message: 'Internal Server Error' });
  }
})
  .use(authenticateUser())
  .use(errorHandler());