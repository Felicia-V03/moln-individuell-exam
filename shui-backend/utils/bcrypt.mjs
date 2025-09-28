import bcrypt from 'bcrypt';

// Antal saltomgångar för bcryct
const saltRounds = 10;

// Hashar ett lösenord med bcryct och returnerar hash-strängen
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Jämför ett plaintext-lösenord med ett hashat lösenord
export const comparePasswords = async (password, storedPassword) => {
  const match = await bcrypt.compare(password, storedPassword);
  return match;
}