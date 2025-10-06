import { verifyToken } from "../utils/jwt.mjs";

export const authenticateUser = () => ({
  before: (handler) => {
    // hämta token från Authorization header
    const authHeader = handler.event.headers?.Authorization || handler.event.headers?.authorization;
    // token måste finnas
    if (!authHeader) throw new Error("No token provided");

    // verifiera token
    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);

    // användare måste finnas eller fel användare
    if (!user) throw new Error("Unauthorized");

    handler.event.user = user;
  }
});
