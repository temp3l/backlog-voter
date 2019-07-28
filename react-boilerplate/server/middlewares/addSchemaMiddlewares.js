const path = require('path');
const express = require('express');
const fs = require('fs');
const yaml = require('node-yaml');
const walker = require('@cloudflare/json-schema-walker');  // schemaWalk
const transform = require('@cloudflare/json-schema-transform');
// mergeCfRecurse, makeCfRecurseWalker, pruneDefinitions, removeLinksAndDefs, getCollapseAllOfCallback, collapseSchemas, rollUpExamples, getCurlExampleCallback, processApiDocSchema, getCurlExampleCallback, processApiDocSchema, AutoExtensionDereferencer, vocabularies
const deref = require('@cloudflare/json-schema-ref-loader');
const hyper = require('@cloudflare/json-hyper-schema');  // extractLdos, extractLdo, resolveUri
const loader = require('@cloudflare/json-schema-transform'); // yarn add node-yaml @cloudflare/json-schema-walker @cloudflare/json-schema-transform @cloudflare/json-schema-ref-loader @cloudflare/json-hyper-schema
const vocabulary = walker.vocabularies;

const fns = { walker, transform, deref: { deref }, hyper, loader };

module.exports = function addProdMiddlewares(app, options) {
  app.set('json spaces', 2)
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  
  app.get('/fns/vocabulary', (req, res) => {
    res.json( Object.keys(vocabulary).map( v => ({ [v]: Object.keys(vocabulary[v]) })) );
  });
  app.get('/fns', (req, res) => 
    res.json(  Object.keys(fns).map(v => ({ [v]: Object.keys(fns[v]) })) )
  );

  app.get('/fns/:fn/:method/:schema', (req, res) => {
    const { fn, method, schema } = req.params;
    res.json({ fn, method, schema });
  });


  app.get('/deref/:schema', (req, res) => {
    const schema = JSON.parse( fs.readFileSync( path.resolve(process.cwd(), './schemas/schema.json') ));

    
    const schemas = [ 'http://localhost:4000/api/item-schemas/protectonaut', 'http://localhost:4000/api/collection-schemas/protectonaut']

    const transformed = transform.processApiDocSchema(schema, {  // link generator
      baseUri: 'http://localhost:4000/api/',
      globalHeaderSchema: { example: { Accept: 'application/json', 'Content-Type': 'application/json' } }
    });
        res.json(transformed) 

  })
};

/*
const schemas = [ 'http://localhost:4000/api/item-schemas/protectonaut', 'http://localhost:4000/api/collection-schemas/protectonaut']

walker.schemaWalk(schema, (data, path) => console.log(data.type, path), null, vocabulary); // // schema, preFunc, postFunc, vocabulary



const async () => {
  return deref(schemas[0]);  
}


console.log(JSON.stringify(transformed, null, 4));

// console.log( deref('http://localhost:3000/schema.json') )
let test = hyper.resolveUri(schema)
 */