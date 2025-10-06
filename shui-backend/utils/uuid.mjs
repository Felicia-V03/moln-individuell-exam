import { v4 as uuid } from 'uuid';

// skapar en unika id och beorde på antal i count
export const generateId = (count) => {
  return uuid().substring(0, count);
}