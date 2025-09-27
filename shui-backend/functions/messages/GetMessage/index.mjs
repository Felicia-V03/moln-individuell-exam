import middy from '@middy/core';
import { sendResponse } from "../../../responses/index.mjs";
import { getAllMessages } from '../../../services/messages.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';

export const handler = middy(async (event) => {
  try {
    const { username, dateTime } = event.queryStringParameters || {};

    const messages = await getAllMessages({ username, dateTime });

    if (messages.length === 0) {
      console.log('No messages found yet');
      return sendResponse(404, { message: 'No messages found yet' });
    } else {    
      console.log('Messages retrieved successfully:', messages);
      return sendResponse(200, { messages });
    }
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return sendResponse(500, { message: 'Internal Server Error' });
  }
}).use(errorHandler());