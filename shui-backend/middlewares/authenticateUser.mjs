import { verifyToken } from "../utils/jwt.mjs";

export const authenticateUser = () => ({
  before : (handler) => {
    const authHandler = handler.event.headers?.Authorization || handler.event.headers?.authorization;
    console.log('authHeader', handler.event);
    if (!authHandler) {
      throw new Error('No token provided');
    }

    const token = authHandler.split(' ')[1];
    try {
      const user = verifyToken(token);
      console.log('TOKEN', token);
      if (!user) throw new Error('Invalid token');
      handler.event.user = user;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new Error('Invalid token');
    }
  }
});