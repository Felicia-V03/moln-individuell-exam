import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../../responses/index.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { addMessage } from '../../../services/messages.mjs';
import { validateMessage } from '../../../middlewares/validateMessage.mjs';
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs';

export const handler = middy(async (event) => {
  // ta emot username och message från event body
  const username = event.user.username;
  const messageText = event.body.message;

  // skapa meddelande
  const response = await addMessage(username, messageText);
  
  // returnera svar
  console.log('CreateMessage response:', response);
  if (response) {
    return sendResponse(201, { message: 'Message created', data: response });
  } else {
    return sendResponse(500, { message: 'Failed to create message' });
  }
})
  .use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(validateMessage())
  .use(errorHandler());