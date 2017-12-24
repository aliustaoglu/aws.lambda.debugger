const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const config = require('./config');
const R = require('ramda');

module.exports = apiName => {
  if (!fs.existsSync(path.join(__dirname, 'apis', apiName))){
    console.log('Cannot find api named "' + apiName + '"');
    return 0;
  }
  
  AWS.config.update({ region: config.lambdaConfigs.Region });
  const credentials = new AWS.SharedIniFileCredentials({ profile: config.profile });
  AWS.config.credentials = credentials;
  const lambda = new AWS.Lambda();

  const output = fs.createWriteStream('lambda.zip');
  const zipArchive = archiver('zip');
  archive = zipArchive.directory('./apis/' + apiName + '/', '/');
  archive.pipe(output);
  zipArchive.finalize();

  output.on('close', function() {
    const buff = fs.readFileSync('lambda.zip');
    fs.unlinkSync('lambda.zip');
    const funcs = lambda.listFunctions({}, (err, data) => {
      if (err) {
        console.log(err);
      }
      const exists = R.filter(x => x.FunctionName === apiName, data.Functions).length > 0;
      if (exists) {
        updateFunction(buff);
      } else {
        createFunction(buff);
      }
    });
  });

  const createFunction = zipFile => {
    lambda.createFunction(
      {
        FunctionName: apiName,
        Code: {
          ZipFile: zipFile
        },
        Runtime: config.lambdaConfigs.Runtime,
        Role: config.lambdaConfigs.Role,
        Handler: config.lambdaConfigs.Handler
      },
      (err, data) => {
        if (err) {
          console.log('Error occured while creating ' + apiName + ': ' + err);
        } else {
          console.log(apiName + ' has been created successfully.');
        }
      }
    );
  };

  const updateFunction = zipFile => {
    lambda.updateFunctionCode(
      {
        FunctionName: apiName,
        ZipFile: zipFile
      },
      (err, data) => {
        if (err) {
          console.log('Error occured while updating ' + apiName + ': ' + err);
        } else {
          console.log(apiName + ' has been updated successfully.');
        }
      }
    );
  };
};
