/*
 *  fs npm library
 */
const fs = require('fs');
const VALIDATEFILE = require('./validateFile');

/*
 *  @custom
 *  Get Data from file
 *  returns array of object
 */
module.exports = (file) => {
  const rawData = fs.readFileSync(file);

  /*
   *  Validating the data if it has json format.
   */
  if(!VALIDATEFILE(rawData)) {
    console.log(`Error: ${FILE_ARG} failed to read.`)
    return;
  }

  return JSON.parse(rawData);
};
