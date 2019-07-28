const path = require('path');
const fs = require('fs');
const yaml = require('node-yaml');
/*
const walker = require('@cloudflare/json-schema-walker');  // schemaWalk
const transformer = require('@cloudflare/json-schema-transform');
// mergeCfRecurse, makeCfRecurseWalker, pruneDefinitions, removeLinksAndDefs,
// getCollapseAllOfCallback, collapseSchemas, rollUpExamples, getCurlExampleCallback,
// processApiDocSchema, getCurlExampleCallback, processApiDocSchema, AutoExtensionDereferencer, vocabularies
const loader = require('@cloudflare/json-schema-ref-loader');
const hyper = require('@cloudflare/json-hyper-schema');  // extractLdos, extractLdo, resolveUri
const vocabulary = walker.vocabularies;
const fns = { walker, transformer, hyper, deref: { loader }};
const schemas = [ 'http://localhost:4000/api/item-schemas/protectonaut', 'http://localhost:4000/api/collection-schemas/protectonaut']
const sample = JSON.parse( fs.readFileSync( path.resolve(process.cwd(), './schemas/schema.json') ));
*/

// 1. deref
const $RefParser = require("json-schema-ref-parser");


