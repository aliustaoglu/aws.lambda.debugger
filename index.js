const AWS = require('aws-sdk');
const config = require('./config');
AWS.config.update({region: config.lambdaConfigs.Region});
const credentials = new AWS.SharedIniFileCredentials({profile: config.profile});
AWS.config.credentials = credentials;
// ### DON'T UPDATE ABOVE

// AWS Lambda mocks (update when you need to change params)
let lambdaResponse;
const context = {
  succeed: (response) => {
    lambdaResponse = response;
    console.log(response);
  }
};

// Update below as your needs for debugging

//const mapData = require('./apis/mapData/index');
//var fs = require('fs');
//const m = mapData.handler(null, context, null);

require('./deployer')('aa');