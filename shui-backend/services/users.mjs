import { hashPassword } from "../utils/bcrypt.mjs";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./client.mjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";

// funktion för att skapa en ny användare
export const createUser = async (user) => {
  console.log("Creating user:", user);
  const command = new PutItemCommand({
    TableName : 'shui-messages-table',
    Item : {
      PK : { S : `USER#${user.username}` },
      SK : { S : 'PROFILE' },
      attributes: {
        M: {
          username: { S: user.username },
          password: { S: await hashPassword(user.password) },
          email: { S: user.email }
        }
      }
    }
  });

  try {
    await client.send(command);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

// funktion för att hämta en användare baserat på användarnamn
export const getUser = async (username) => {
  const command = new GetItemCommand({
    TableName : 'shui-messages-table',
    Key : {
      PK : { S : `USER#${username}` },
      SK : { S : 'PROFILE' }
    }
  });

  try {
    const { Item } = await client.send(command);
    if(!Item) return false;

    const user = unmarshall(Item);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
}