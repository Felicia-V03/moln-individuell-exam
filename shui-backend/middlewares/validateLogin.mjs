import { loginSchema } from "../models/loginSchema.mjs";

// middleware för att validera inloggningsdata
export const validateLogin = () => ({
  before : (handler) => {
    // validera request body mot schema
    if(!handler.event.body) throw new Error("Missing request body");
    const { error, value } = loginSchema.validate(handler.event.body);

    // kasta fel om validering misslyckas
    if(error) throw new Error(error.details[0].message);
    return;
  }
});