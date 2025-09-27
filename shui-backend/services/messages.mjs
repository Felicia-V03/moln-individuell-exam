import { PutItemCommand, QueryCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { client } from './client.mjs';
import { generateId } from '../utils/uuid.mjs';
import { formatDateAndTime } from '../utils/createdAt.mjs';
import { unmarshall } from '@aws-sdk/util-dynamodb';

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
          createdAt: { S: dateTime }
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
      createdAt: dateTime
    };
  } catch (error) {
    console.error('Error creating message:', error);
    return { success: false };
  }
};

export const getAllMessages = async ({ username, dateTime } = {}) => {
  let command;

  if (username && dateTime) {
    command = new QueryCommand({
      TableName: 'shui-messages-table',
      KeyConditionExpression: 'PK = :pk',
      FilterExpression: 'begins_with(#attributes.#createdAt, :createdAt)',
      ExpressionAttributeNames: {
        '#attributes': 'attributes',
        '#createdAt': 'createdAt'
      },
      ExpressionAttributeValues: {
        ':pk': { S: `USER#${username}` },
        ':createdAt': { S: dateTime },
      },
    });
  } else if (username) {
    command = new QueryCommand({
      TableName: 'shui-messages-table',
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': { S: `USER#${username}` },
        ':sk': { S: 'MESSAGE' },
      },
    });
  } else if (dateTime) {
    command = new QueryCommand({
      TableName: 'shui-messages-table',
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :gsi1pk',
      FilterExpression: 'begins_with(#attributes.#createdAt, :createdAt)',
      ExpressionAttributeNames: {
        '#attributes': 'attributes',
        '#createdAt': 'createdAt'
      },
      ExpressionAttributeValues: {
        ':gsi1pk': { S: 'MESSAGE' },
        ':createdAt': { S: dateTime },
      },
    });
  } else {
    command = new QueryCommand({
      TableName: 'shui-messages-table',
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :gsi1pk',
      ExpressionAttributeValues: {
        ':gsi1pk': { S: 'MESSAGE' }
      },
    });
  }

  try {
    const { Items } = await client.send(command);
    return Items.map((item) => unmarshall(item));
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const getMessageById = async (messageId) => {
  const command = new QueryCommand({
    TableName: 'shui-messages-table',
    IndexName: "GSI1",
    KeyConditionExpression: "GSI1PK = :gsi1pk AND GSI1SK = :gsi1sk",
    ExpressionAttributeValues: {
      ":gsi1pk": { S: "MESSAGE" },
      ":gsi1sk": { S: messageId },
    },
    Limit: 1,
  });

  try {
    const { Items } = await client.send(command);
    if (Items && Items.length > 0) {
      return unmarshall(Items[0]);
    }
    return null;
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    return null;
  }
};

export const deleteMessage = async (messageId) => {
  const message = await getMessageById(messageId);
  if (!message) {
    return false;
  }

  const command = new DeleteItemCommand({
    TableName: 'shui-messages-table',
    Key: {
      PK: { S: message.PK },
      SK: { S: message.SK }
    }
  });

  try {
    await client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
};