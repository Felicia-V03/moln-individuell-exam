import jwt from 'jsonwebtoken';

// hemlig nyckel som används för att singera och verifiera JWT
const SECRET = 'shuihemligt';

// skapar ben JWT-token för en användare
export const generateToken = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, SECRET, { expiresIn: '10h' });
};

// verifierar en JWT-token och returnerar det dekodade payloadet
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("Token expired");
      return null;
    }
    console.error("Invalid token:", err.message);
    return null;
  }
};
