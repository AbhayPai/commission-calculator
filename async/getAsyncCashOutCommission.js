/*
 *  moment.js npm library
 */
const moment = require('moment');
/*
 *  custom helper funtion
 *  @return Promise
 */
const getAsyncXHR = require('./../helpers/getAsyncXHR');

/*
 *  Calculating cashout commission
 */
module.exports = async (transaction, transactions) => {
  let commission = '';
  let usertype = transaction.user_type;
  let amount = transaction.operation.amount;
  let startDate = moment(transaction.date, 'YYYY-MM-DD').startOf('isoWeek').format('YYYY-MM-DD');
  let endDate = moment(transaction.date, 'YYYY-MM-DD').endOf('isoWeek').format('YYYY-MM-DD');
  let configNatural = await getAsyncXHR('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural');
  let configLegal = await getAsyncXHR('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical');
  let percemtLegal = configLegal.percents;
  let percentNatural = configNatural.percents;

  if(usertype === 'juridical') {
    commission = ((amount * percemtLegal) / 100);
    commission = commission < 0.5 ? 0.5 : commission;
  } else {
    let total = 0;
    transactions.forEach((data) => {
      if(moment(data.date, 'YYYY-MM-DD').isBetween(startDate, endDate, null, '[]')
        && transaction.user_id === data.user_id && data.type === 'cash_out') {
          total += data.operation.amount;
      }
    });

    if (total > 1000) {
      commission = (((amount > 1000 ? amount - configNatural.week_limit.amount : amount) * percentNatural) / 100);
    } else {
      commission = 0;
    }
  }

  return commission;
};
