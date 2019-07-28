const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');
const yaml = require('node-yaml');
const walker = require('@cloudflare/json-schema-walker'); // schemaWalk
const transform = require('@cloudflare/json-schema-transform');
// mergeCfRecurse, makeCfRecurseWalker, pruneDefinitions, removeLinksAndDefs,
// getCollapseAllOfCallback, collapseSchemas, rollUpExamples, getCurlExampleCallback,
// processApiDocSchema, getCurlExampleCallback, processApiDocSchema, AutoExtensionDereferencer, vocabularies
const loader = require('@cloudflare/json-schema-ref-loader');
const hyper = require('@cloudflare/json-hyper-schema'); // extractLdos, extractLdo, resolveUri
const vocabulary = walker.vocabularies;
const fns = { walker, transform, hyper, deref: { loader } };

const schemaPath = path.resolve(process.cwd(), 'schemas');
const schemas = [
  'http://localhost:4000/api/item-schemas/protectonaut',
  'http://localhost:4000/api/collection-schemas/protectonaut',
];
const uri = './schemas/schema.json';
const lib = require('../../lib/lib')
const sample = JSON.parse( fs.readFileSync(uri.replace('file://','')) );
const refs = JSON.parse(fs.readFileSync('./schemas/refs.json', 'utf-8'))
// @cloudflare/json-schema-apidoc-loader
/*
  mergeCfRecurse: [Function: mergeCfRecurse],
  makeCfRecurseWalker: [Function: makeCfRecurseWalker],
  pruneDefinitions: [Function: pruneDefinitions],
  removeLinksAndDefs: [Function: removeLinksAndDefs],
  getCollapseAllOfCallback: [Function: getCollapseAllOfCallback],
  collapseSchemas: [Function: collapseSchemas],
  rollUpExamples: [Function: rollUpExamples],
  getCurlExampleCallback: [Function: getCurlExampleCallback],
  processApiDocSchema: [Function: processApiDocSchema],
  AutoExtensionDereferencer: [Function: AutoExtensionDereferencer],
*/
    

module.exports = function addProdMiddlewares(app, options) {
  app.set('json spaces', 2);
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');



  // processApiDocSchema  - expects the document to be dereferenced alrady!
  const transformed = transform.processApiDocSchema(refs,
    { baseUri: 'http://localhost:3000/deref/',
      globalHeaderSchema: {
        example: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    });
  //console.log(JSON.stringify(transformed,null,2));
  const pruned = transform.pruneDefinitions(refs)
  console.log();

  app.get('/fns', (req, res) =>
    res.json(
      Object.assign(
        {},
        { fns: Object.keys(fns).map(v => ({ [v]: Object.keys(fns[v]) })) },
        {
          voc: Object.keys(vocabulary).map(v => ({
            [v]: Object.keys(vocabulary[v]),
          })),
        },
      ),
    ),
  );

  app.get('/fns/:fn/:method/:schema', (req, res) => {
    const { fn, method, schema } = req.params;
    console.log(req.params);
    //fns[method](schema)

    res.json({ fn, method, schema });
  });

  app.get('/deref/:schema', (req, res) => {
    const transformed = transform.processApiDocSchema(req.params.schema, {
      baseUri: 'http://localhost:4000/api/',
      globalHeaderSchema: {
        example: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    });
    res.json(transformed);
  });
  app.use(
    '/schemos',
    express.static('./schemas'),
    serveIndex('./schemas', { icons: true }),
  );

  app.get('/schemo/:path', (req, res) =>
    res.sendFile(path.resolve(process.cwd(), './schemas/', req.params.path)),
  );

  app.get('/voodoo', (req, res) => {
    res.json({ t: transformer.pruneDefinitions(sample) });
  });
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


1. json-ref-parser
2. apiDoc


 */
