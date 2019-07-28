const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');
const $RefParser = require('json-schema-ref-parser');

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
const lib = require('../../lib/lib')

const uri = './schemas/schema.json';
const sample = JSON.parse( fs.readFileSync(uri) );
const refs = JSON.parse(fs.readFileSync('./schemas/refs.json', 'utf-8'))

// @cloudflare/json-schema-apidoc-loader
const globalHeaderSchema = (schema) => {
   const transformed = transform.processApiDocSchema(schema,
    { baseUri: 'http://localhost:4000/api/',
      globalHeaderSchema: {
        example: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    });
   return transformed
}


module.exports = function addProdMiddlewares(app, options) {
  app.set('json spaces', 2);
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.join(process.cwd(), 'build');
  console.log(options)
  // processApiDocSchema  - expects the document to be dereferenced alrady!
  // console.log(JSON.stringify(transformed,null,2));
  // const pruned = transform.pruneDefinitions(refs)
  // console.log(pruned);


app.get('/dist/*', async (req,res) => {
  // console.log(req.params);
  const _tpath = [ ...req.params[0].split('/').filter(s => s !== 'favicon.ico')]
  if(!_tpath.length) { return res.send('chooose file') }
  console.log(_tpath)
  const fileName = _tpath.pop();
  const _folder = path.join([ './schemas/',..._tpath ].join('/'));
  const filePath = path.join([_folder, fileName].join('/'))


  const links = globalHeaderSchema({links:[  
    { "rel": "add",        "href":"service.io/foo", method: "post" }, 
    { "rel": "delete",     "href":"service.io/foo", method: "post" }, 
    { "rel": "previous",   "href": "http://localhost:4000/api/protectonaut?filter[limit]={limit}&filter[offset]={previousOffset}{&paginateQs*}"},
    { "rel": "next", href: "http://localhost:4000/api/protectonaut?filter[limit]={limit}&filter[offset]={nextOffset}{&paginateQs*}"},
  ]});
  
  const ret = await lib.deref(filePath); // local lookup, then fetch
  
  
  let foo = Object.assign({filePath}, ret, links )
    res.send(foo)
});


  app.get('/fns', (req, res) =>
    res.json(Object.assign({},
        { fns: Object.keys(fns).map(v => ({ [v]: Object.keys(fns[v]) })) },
        { voc: Object.keys(vocabulary).map(v => ({ [v]: Object.keys(vocabulary[v]) })) },
      ),
    ),
  );

  app.get('/fns/:fn/:method/:schema', (req, res) => {
    const { fn, method, schema } = req.params;
    console.log(req.params);
    //fns[method](schema)

    res.json({ fn, method, schema });
  });



  app.get('/deref/:schema', async (req, res) => {
    console.log(req.params);
    const schemaPath = path.join('./schemas/', req.params.schema);
    try {
      const dereferenced = await lib.deref(schemaPath);
      // let test = hyper.joinUri(dereferenced)
      // console.log(parser.$refs.paths());
      res.json(dereferenced)
    }catch(e){
      console.log(e)
      res.status(e.status).send(e.message)
    }
     

  });
  app.use('/schemos', express.static('./schemas'), serveIndex('./schemas', { icons: true }), );

  app.get('/schemo/:path', (req, res) =>
    res.sendFile(path.join(process.cwd(), './schemas/', req.params.path)),
  );

  app.get('/voodoo', (req, res) => {
    res.json({ t: transform.pruneDefinitions(sample) });
  });
};

/*

walker.schemaWalk(schema, (data, path) => console.log(data.type, path), null, vocabulary); // // schema, preFunc, postFunc, vocabulary


// console.log( deref('http://localhost:3000/schema.json') )


1. json-ref-parser
2. apiDoc


 */
    /*
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
    */