import { client } from '../utils/client.mjs';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { generateId } from '../utils/generateId.mjs';
import { formatDateAndTime } from '../utils/formatDateAndTime.mjs';

export const addMessage = async (username, message, messageId) => {
  if (!messageId) {
    messageId = generateId(4);
  }

  const dateTime = formatDateAndTime();

  const command = new PutItemCommand({
    TableName: 'shui-message-table',
    Item: {
      PK : { S : `USER#${username}` },
      SK : { S : `MESSAGE#${messageId}` },
      GSI1PK : { S : `MESSAGE` },
      GSI1SK : { S : `${messageId}` },
      attributes : {
        M : {
          message : { S : message },
          createAt : { S : dateTime },
        }
      }
    },
  });

  try {
    const response = await client.send(command);
    console.log('RESPONSE', response);

    return {
      messageId : messageId,
      message : message,
      createAt : dateTime,
    };
  } catch (error) {
    console.error('Error creating message:', error);
    return false;
  }
}