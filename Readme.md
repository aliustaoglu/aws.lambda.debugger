### Debug and Deploy AWS Lambda Functions locally
This project is a basic boilerplate allowing you to debug your AWS Lambda Functions and also deploy them quickly from your local environment.

![Debugging AWS Lambda locally](https://raw.githubusercontent.com/aliustaoglu/aws.lambda.debugger/master/resources/debug.png)

There are very sophisticated industry standards like Serverless but for small to middle size projects I find Serverless to be quite an overkill as you need to do lots of configuration. For my personal or hobby projects I need a very simple solution where I can debug my application and also deploy code using npm scripts. By debugging I mean "debugging". Putting a breakpoint in the code and when I hover my mouse over the variable I want to see all avaialable attributes, not logging things in Cloudformation. This has been one of the downsides of AWS Lambda. Not very easy to debug.

Using this boilerplate I put all my lambda functions under /apis folder. When I want to debug it I just change a line in the index.js file. All my breakpoints will be triggered when I run the simple node js application.

```js
const helloApi = require('./apis/helloApi/index');
```

Config files are as less as possible. Listed under config.js. You definitely will need to change at least Lambda Role. This role needs to have all the credentials that your lambda script needs to run. 

If you want to create more functions just create a new folder under /apis. If you want to deploy a single function just use:

> npm run deploy helloApi

or if you want to deploy ALL scripts under /apis folder just run:

> npm run deploy :ALL

This is just a simple but effective solution to deploy lambdas. It assumes you have the right credentials set. It does not configure API Gateway or IAM. 