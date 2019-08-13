const application = require('./dist');

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 3000),
      host: process.env.HOST,
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}


/*
  {
    "detail": "Request took too long to complete.",
    "instance": "string",
    "status": 503,
    "title": "string",
    "type": "https://tools.ietf.org/html/rfc7231#section-6.6.4"
  }
  {
    "error": {
      "statusCode": 422,
      "name": "UnprocessableEntityError",
      "message": "The request body is invalid. See error object `details` property for more info.",
      "code": "VALIDATION_FAILED",
      "details": [
        {
          "path": ".contractId",
          "code": "type",
          "message": "should be string",
          "info": {
            "type": "string"
          }
        }
      ]
    }
  }

*/
