import { sendResponse } from "../responses/index.mjs";

// middleware för att hantera fel och skicka standardiserade felmeddelanden
export const errorHandler = () => ({
  onError : (handler) => {        
    handler.response = sendResponse(400, { message : handler.error.message });
  }
});