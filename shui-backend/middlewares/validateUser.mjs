import { userSchema } from "../models/userSchema.mjs";

// middleware för att validera användardata
export const validateUser = () => ({
  before : (handler) => {
    // validera request body mot schema
    if(!handler.event.body) throw new Error("Missing request body");
    const { error, value } = userSchema.validate(handler.event.body);

    // kasta fel om validering misslyckas
    if(error) throw new Error(error.details[0].message);
    return;
  }
});