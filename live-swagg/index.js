const express = require('express')
const Enforcer = require('openapi-enforcer-middleware')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const controllerDirectory = path.resolve(__dirname, 'controllers')
const mockDirectory = path.resolve(__dirname, 'mock-controllers') 
const pathToOpenApiDoc = path.resolve(__dirname, '../people.yaml')
const swaggerDocument = YAML.load(pathToOpenApiDoc);
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var swStats = require('swagger-stats');
var apiSpec = swaggerDocument
app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));

const enforcer = Enforcer(pathToOpenApiDoc);
enforcer.use(function(req, res, next) {
  console.log('run some code')
  next();
});

enforcer.use(function(err, req, res, next) {
  // single error here
  console.log(err)
  next()
});

enforcer.mocks(mockDirectory, false).catch(() => {});  // this middleware will handle explicit mock requests
enforcer.controllers(controllerDirectory).catch(console.error);
enforcer.mocks(mockDirectory, true).catch(() => {}); // fallback mock

app.get('/spec.yaml', (req,res) => fs.readFile(pathToOpenApiDoc, (err,data)=> res.send(data)) )
app.get('/spec.json', (req,res) => res.json(swaggerDocument))
app.use(express.static( path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendfile('public/main.html');
});



app.use(enforcer.middleware())
app.use((err, req, res, next) => {
  // If the error was in the client's request then send back a detailed report
  if (err.statusCode >= 400 && err.statusCode < 500 && err.exception) {
    res.set('Content-Type', 'text/plain');
    res.status(err.statusCode);
    res.json({message: err.message, code: err.statusCode})
    // If it's unsafe to send back detailed errors then send back limited error information
  } else {
    console.error(err.stack)
    res.status(err.statusCode || 500).json({message: err.message, code: err.statusCode || 500})

  }
})

const listener = app.listen(process.env.PORT || 3003, err => {
  if (err) return console.error(err.stack);
  console.log('Server listening on port ' + listener.address().port);
  console.log('Swagger-UI at: ' + 'http://localhost:'+listener.address().port+'/api-docs/');
  console.log('http://localhost:'+listener.address().port+'/people?x-mock=200');
  console.log('http://localhost:'+listener.address().port+'/swagger-stats/stats');
})
