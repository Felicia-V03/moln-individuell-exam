import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// skapa en DynamoDB-klient för regionen eu-north-1
export const client = new DynamoDBClient({ region : 'eu-north-1' });