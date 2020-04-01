/*
 *  custom helper funtion
 *  @return Promise
 */
const getAsyncXHR = require('./../helpers/getAsyncXHR');

/*
 *  Calculating cashin commission
 */
module.exports = async (transaction) => {
  let amount = transaction.operation.amount;
  let config = await getAsyncXHR('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in');
  return ((amount * config.percents) / 100) > 5 ? 5 : commission = ((amount * config.percents) / 100);
};
