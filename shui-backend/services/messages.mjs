import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from './client.mjs';
import { generateId } from '../utils/uuid.mjs';
import { formatDateAndTime } from '../utils/createdAt.mjs';

export const addMessage = async ( username, message, messageId = null) => {
  if (!messageId) {
    messageId = generateId(4);
  }

  const dateTime = formatDateAndTime();

  const command = new PutItemCommand({
    TableName: 'shui-messages-table',
    Item: {
      PK: { S: `USER#${username}` },
      SK: { S: `MESSAGE#${messageId}` },
      GSI1PK: { S: 'MESSAGE' },
      GSI1SK: { S: messageId },
      attributes: {
        M: {
          message: { S: message },
          createAt: { S: dateTime }
        }
      }
    }
  });

  try {
    const response = await client.send(command);
    console.log('Response:', response);

    return {
      success: true,
      messageId,
      message,
      createAt: dateTime
    };
  } catch (error) {
    console.error('Error creating message:', error);
    return { success: false };
  }
};
