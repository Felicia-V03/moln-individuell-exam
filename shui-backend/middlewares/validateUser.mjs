import { userSchema } from "../models/userSchema.mjs";

export const validateUser = () => ({
  before : (handler) => {
    if(!handler.event.body) throw new Error("Missing request body");
    const { error, value } = userSchema.validate(handler.event.body);
    if(error) throw new Error(error.details[0].message);
    return;
  }
});