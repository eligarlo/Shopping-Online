module.exports = (UnixTimeStamp) => {
  const date = new Date(UnixTimeStamp);
  const now = new Date();
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return date >= now;
};
