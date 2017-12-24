module.exports = {
  profile: 'default',
  lambdaConfigs : {
    Runtime: 'nodejs6.10',
    Role: 'arn:aws:iam::000000000000:role/lambda_basic_execution',
    Handler: 'index.handler',
    Region: 'us-east-1'
  }
}