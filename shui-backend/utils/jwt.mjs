import jwt from 'jsonwebtoken';

const SECRET = 'shuihemligt';

export const generateToken = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, SECRET, { expiresIn: '10h' });
};

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
