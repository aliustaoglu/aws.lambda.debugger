const AWS = require('aws-sdk');
const config = require('./config');
AWS.config.update({ region: config.lambdaConfigs.Region });
const credentials = new AWS.SharedIniFileCredentials({ profile: config.profile });
AWS.config.credentials = credentials;
// ### DON'T UPDATE ABOVE
// =============================================================

// AWS Lambda mocks (update when you need to change params)
//--------------------------------------------------------------
const context = {
  succeed: response => {
    console.log('context.succeed: ' + response);
  },
  done: response => {
    console.log('context.done: ' + response);
  },
  fail: error => {
    console.log('context.fail: ' + error);
  },

};
const event = {
  key3: 'value3',
  key2: 'value2',
  key1: 'value1'
};
const callback = (error, result) => {
  if (error) {
    console.log('Callback error: ' + error);
  } else {
    console.log('Callback result: ' + result);
  }
}
//--------------------------------------------------------------

// Update below as your needs for debugging
// The function you like to debug etc
const helloApi = require('./apis/helloApi/index');
var fs = require('fs');
const m = mapData.handler(event, context, callback);
