import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { sendResponse } from '../../../responses/index.mjs'
import { errorHandler } from '../../../middlewares/errorHandler.mjs'
import { createMessage } from '../../../services/messages.mjs'
import { validateMessage } from '../../../middlewares/validateMessage.mjs'

export const handler = middy(async (event) => {
  const messageData = await createMessage(event.body);

  if (messageData.seccess) {
    return sendResponse(201, {
      message: 'Message created successfully',
      data: messageData.data
    });
  } else {
    return sendResponse(500, { message: 'Failed to create message' });
  }
})
  .use(httpJsonBodyParser())
  .use(validateMessage())
  .use(errorHandler());