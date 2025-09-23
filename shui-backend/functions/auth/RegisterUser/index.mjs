import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../../responses/index.mjs';
import { validateUser } from '../../../middlewares/validateUser.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { createUser } from '../../../services/users.mjs';

export const handler = middy(async (event) => {
  const response = await createUser(event.body);
  if(response) {
    return sendResponse(201, { message: 'User created successfully', userId: response });
  } else {
    return sendResponse(500, { message: 'Failed to create user' });
  }
})
  .use(httpJsonBodyParser())
  .use(validateUser())
  .onError(errorHandler());