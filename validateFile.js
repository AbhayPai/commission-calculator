module.exports = (tempArgData) => {
  try {
    JSON.parse(tempArgData);
    return true;
  } catch (tempError) {
    return false;
  }
};
