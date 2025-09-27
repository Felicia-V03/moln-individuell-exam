import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { deleteMessage } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';

export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};

  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }

  const success = await deleteMessage(id);

  if (!success) {
    console.error("Message not found or could not be deleted for ID:", id);
    return sendResponse(404, { message: 'Message not found or could not be deleted' });
  }

  console.log("Deleted message with ID:", id);
  return sendResponse(200, { message: 'Message deleted successfully' });
})
  .use(errorHandler());