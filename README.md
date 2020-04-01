# Commission Calculator
## Following are the steps you need follow to test this repo.
1. Clone this reposirtory using following command
```sh
git clone https://github.com/AbhayPai/commission-calculator.git .
```
2. Move inside `commission-calculator` folder
```sh
cd commission-calculator
```
3. Install npm packages
```sh
npm install
```
4. Run following command
```
nodejs index.js input.json
```
5. You should see following output
```
User: 2 | Amount: 1000000 | Transaction Type: cash_in | Transaction Date: 2016-01-10 | Commission: 5
User: 1 | Amount: 200 | Transaction Type: cash_in | Transaction Date: 2016-01-05 | Commission: 0.06
User: 1 | Amount: 1000 | Transaction Type: cash_out | Transaction Date: 2016-01-07 | Commission: 3
User: 2 | Amount: 300 | Transaction Type: cash_out | Transaction Date: 2016-01-06 | Commission: 0.9
User: 1 | Amount: 30000 | Transaction Type: cash_out | Transaction Date: 2016-01-06 | Commission: 87
User: 1 | Amount: 100 | Transaction Type: cash_out | Transaction Date: 2016-01-10 | Commission: 0.3
User: 1 | Amount: 300 | Transaction Type: cash_out | Transaction Date: 2016-02-15 | Commission: 0
User: 1 | Amount: 100 | Transaction Type: cash_out | Transaction Date: 2016-01-07 | Commission: 0.3
User: 3 | Amount: 1000 | Transaction Type: cash_out | Transaction Date: 2016-01-10 | Commission: 0
```

# Third party libraries used in this repo are as follows.
1. [moment.js](https://github.com/moment/moment)
2. [node-fetch](https://github.com/node-fetch/node-fetch)