import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { updateMessage } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
  const { username } = event.user || {};
  const { id } = event.pathParameters || {};
  const { message } = JSON.parse(event.body || '{}');

  // id måste finnas
  if (!id) {
    console.error("No messageId provided in path parameters");
    return sendResponse(400, { message: 'Message ID is required' });
  }

  // message måste finnas
  if (!message || message.trim() === '') {
    console.error("No message content provided in request body");
    return sendResponse(400, { message: 'Message content is required' });
  }

  try {
    // uppdatera meddelande
    const updatedMessage = await updateMessage(username, id, message);

    // returnera svar när meddelande kan inte uppdateras
    if (!updatedMessage) {
      console.error("Message not found or could not be updated for ID:", id);
      return sendResponse(404, { message: 'Message not found or could not be updated' });
    }

    // returnera svar när meddelande är uppdaterad
    console.log("Updated message with ID:", id);
    return sendResponse(200, { message: 'Message updated successfully', updatedMessage });
  } catch (error) {
    // returnera svar vid fel
    console.error('Error in update handler:', error);
    return sendResponse(500, { message: 'Internal Server Error' });
  }
})
  .use(authenticateUser())
  .use(errorHandler());