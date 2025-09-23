import { hashPassword } from "../utils/bcrypt.mjs";
import { v4 as uuidv4 } from "uuid";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./client.mjs";

export const createUser = async (user) => {
  console.log("Creating user:", user);
  const command = new PutItemCommand({
    TableName : 'shui-table',
    Item : {
      PK : { S : `USER#${uuidv4()}` },
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