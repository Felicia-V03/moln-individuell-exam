import { loginSchema } from "../models/loginSchema.mjs";

export const validateLogin = () => ({
  before : (handler) => {
    if(!handler.event.body) throw new Error("Missing request body");
    const { error, value } = loginSchema.validate(handler.event.body);
    if(error) throw new Error(error.details[0].message);
    return;
  }
});