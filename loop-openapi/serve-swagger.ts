const fs = require('fs')
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const loader = require('speccy/lib/loader');
const targetSpec = './data/spec.json';
const swaggerJSDoc = require('swagger-jsdoc');



const foo = async() => {

  const spec = await loader.loadSpec('./src/assets/sourceapi.yaml',{
    resolve: true,
    verbose:1,

    jsonSchema: false,
  })
  fs.writeFileSync(targetSpec, JSON.stringify(spec,null,3));

    const options = { explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: { validatorUrl: null,
        //url: 'http://localhost:5000/spec.json',
      },
    };

    app.use('/', swaggerUi.serve, swaggerUi.setup(spec, options));

    const swaggerSpec = swaggerJSDoc({
      definition: spec,
      apis: ['./data/routes.js'],      // Path to the API docs
    });

    app.get('/docs', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });

  const port = process.env.PORT || 3333;
  app.listen(port, () => console.log('serving fresh swagger-ui on: ', port ));

}
foo()
