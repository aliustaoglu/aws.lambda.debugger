const fs = require('fs');
const path = require('path');
const deployer = require('./deployer');

const apiName = process.argv.slice(2)[0];

if (!apiName) {
  console.error('No API name found. Please provide an API name');
  return 0;
}

// Deploy all the APIs in the apis folder
if (apiName == ':ALL') {
  const dirs = fs.readdirSync(path.join(__dirname, 'apis'));
  for(let i = 0; i<dirs.length; i++){
    const funcName = dirs[i];
    console.log(`Deploying ${i+1} of ${dirs.length} : ${funcName}`)
    deployer(funcName);
  }
  return 0;
}

// single API deploy
deployer(apiName);
