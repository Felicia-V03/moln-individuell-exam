import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = user;
  const token = jwt.sign(payload, 'Shuihemligt', { 
    expiresIn: '1h' 
  });
  return token;
}