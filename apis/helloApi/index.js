'use strict';

exports.handler = function(event, context, callback) {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ hello: 'world' })
  };
  context.succeed(response);
};
