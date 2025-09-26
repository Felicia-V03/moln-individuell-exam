export const formatDateAndTime = () => {
  const now = new Date();
  return now.toISOString().slice(0, 16).replace('T', ' ');
};