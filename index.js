const FS = require('fs');
const PATH = require('path');
const FILE_ARG = process.argv[2];
const FETCH = require("node-fetch");
const VALIDATEFILE = require('./validateFile');

if(typeof FILE_ARG === 'undefined') {
  console.error('Error: Please enter second argument.');
  return;
}

if(PATH.extname(FILE_ARG) !== '.json') {
  console.error('Error: Please check file extension.');
  return;
}

const datas = (() => {
  const tempRawData = FS.readFileSync(FILE_ARG);

  if(!VALIDATEFILE(tempRawData)) {
    console.log(`Error: ${FILE_ARG} failed to read.`)
    return;
  }

  const tempJsonData = JSON.parse(tempRawData);
  return tempJsonData;
})();

const getAsyncConfig = async (tempAPI) => {
  const tempConfigRawData = await FETCH(tempAPI);
  return tempConfigRawData.json();
};

const asyncCalculateCashInCommision = async (tempUserData) => {
  let tempCommision = '';
  let tempAmount = await tempUserData.operation.amount;
  let tempConfig = await getAsyncConfig('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in');
  tempCommision = ((tempAmount * tempConfig.percents) / 100);
  return tempCommision > 5 ? 5 : tempCommision;
};

const asyncCalculateCashOutCommision = async (tempUserData) => {
  let tempCommision = '';
  let tempUserDate = tempUserData.date;
  let tempUserId = tempUserData.user_id;
  let tempUserType = tempUserData.user_type;
  let tempUserAmount = tempUserData.operation.amount;
  let tempNaturalConfig = await getAsyncConfig('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural');
  let tempLegalConfig = await getAsyncConfig('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical');

  if(tempUserType === 'juridical') {
    tempCommision = ((tempUserAmount * tempLegalConfig.percents) / 100);
    tempCommision = tempCommision < 0.5 ? 0.5 : tempCommision;
  } else {
    if (tempUserAmount > 1000) {
      tempCommision = (((tempUserAmount - 1000) * tempNaturalConfig.percents) / 100);
    } else {
      tempCommision = (((tempUserAmount) * tempNaturalConfig.percents) / 100);
    }
  }

  return tempCommision;
};

datas.forEach(async (tempData) => {
  let commission = null;

  if(tempData.type === 'cash_in') {
    commission = await asyncCalculateCashInCommision(tempData);
  }

  if(tempData.type === 'cash_out') {
    commission = await asyncCalculateCashOutCommision(tempData);
  }

  console.log(commission);
});
