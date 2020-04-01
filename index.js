const PATH = require('path');
const FILE_ARG = process.argv[2];
const GETDATA = require('./helpers/getData');
const GETASYNCCICOMM = require('./async/getAsyncCashInCommission');
const GETASYNCCOCOMM = require('./async/getAsyncCashOutCommission');

/*
 *  Validating if file argument is present or not
 */
if(typeof FILE_ARG === 'undefined') {
  console.error('Error: Please enter second argument.');
  return;
}

/*
 *  Validating if file argument is valid extension or not
 */
if(PATH.extname(FILE_ARG) !== '.json') {
  console.error('Error: Please check file extension.');
  return;
}

/*
 *  Storing json data in constant
 */
const transactions = GETDATA(FILE_ARG);

/*
 *  Async Approach
 */
transactions.forEach(async (transaction) => {
  if(transaction.type === 'cash_in') {
    GETASYNCCICOMM(transaction)
      .then(async commission => {
        console.log(`User: ${transaction.user_id} | Amount: ${transaction.operation.amount} | Transaction Type: ${transaction.type} | Transaction Date: ${transaction.date} | Commission: ${commission}`);
      })
      .catch(err => {
        console.log('Error: something went wrong in calling GETASYNCCICOMM');
      });
  }

  if(transaction.type === 'cash_out') {
    GETASYNCCOCOMM(transaction, transactions)
      .then(async commission => {
        console.log(`User: ${transaction.user_id} | Amount: ${transaction.operation.amount} | Transaction Type: ${transaction.type} | Transaction Date: ${transaction.date} | Commission: ${commission}`);
      })
      .catch(err => {
        console.log('Error: something went wrong in calling GETASYNCCOCOMM');
      });
  }
});
