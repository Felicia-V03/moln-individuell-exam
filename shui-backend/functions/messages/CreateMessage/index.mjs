import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { sendResponse } from '../../../responses/index.mjs'
import { errorHandler } from '../../../middlewares/errorHandler.mjs'
import { addMessage } from '../../../services/messages.mjs'
import { validateMessage } from '../../../middlewares/validateMessage.mjs'
import { authenticateUser } from '../../../middlewares/authenticateUser.mjs'

export const handler = middy(async (event) => {
  const user = event.user;
  const messageData = await addMessage({
    ...event.body,
    userId: user.username 
  });

  if (messageData.seccess) {
    return sendResponse(201, {
      message: 'Message created successfully',
      data: messageData
    });
  } else {
    return sendResponse(500, { message: 'Failed to create message' });
  }
})
  .use(httpJsonBodyParser())
  .use(validateMessage())
  .use(authenticateUser())
  .use(errorHandler());