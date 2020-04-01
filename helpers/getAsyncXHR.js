/*
 *  node-fetch npm library
 */
const FETCH = require("node-fetch");

/*
 *  @custom
 *  which can reduce code duplication
 *  returns Promise
 */
module.exports = async (url) => {
  const tempConfigRawData = await FETCH(url);
  return await tempConfigRawData.json();
};
