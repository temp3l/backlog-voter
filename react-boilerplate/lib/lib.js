const fs = require('fs');
const path = require('path');
const transform = require('@cloudflare/json-schema-transform');
const $RefParser = require('json-schema-ref-parser');
// mergeCfRecurse, makeCfRecurseWalker, pruneDefinitions, removeLinksAndDefs,
// getCollapseAllOfCallback, collapseSchemas, rollUpExamples, getCurlExampleCallback,
// processApiDocSchema, getCurlsExampleCallback, processApiDocSchema, AutoExtensionDereferencer, vocabularies
const schemas = [
  'http://localhost:4000/api/item-schemas/protectonaut',
  'http://localhost:4000/api/collection-schemas/protectonaut',
  'file://refs.json',
  'http://localhost:80/refs.json'
];

const options = {
  parse: {
    json: true, // Disable the JSON parser
    yaml: {
      allowEmpty: false, // Don't allow empty YAML files
    },
    text: {
      canParse: ['.txt', '.html'], // Parse .txt and .html files as plain text (strings)
      encoding: 'utf16', // Use UTF-16 encoding
    },
  },
  resolve: {
    file: true, // Don't resolve local file references
    http: {
      timeout: 2000, // 2 second timeout
      withCredentials: true, // Include auth credentials when resolving HTTP references
    },
  },
  dereference: {
    circular: false, // Don't allow circular $refs
  },
};
const re = new RegExp("^(http|https)://", "i");

const resolveLocal = (uri) => {
  let resolved = false
  if( re.test(uri) === true ) return false
  try {
    // console.log('local lookup for: ', uri);
    const localPath = uri.replace('file://', '');
    resolved = JSON.parse( fs.readFileSync( path.join('./schemas/', localPath), 'utf-8') );
  }
  catch (e){
    //if(e) console.log('local lookup failed: ',  e.message);
    return false
  }

  return resolved
};

// .bundle() vs. .dereference()  =>  no circular references
const deref = async (uri) => {
  const localContent = resolveLocal(uri);
  let error;
  let $parser = new $RefParser()
  try {
      await $parser.bundle(localContent || uri);
      console.log('schema fileSystem ');
    }
    catch(err) {
      error = err;
  }
  
  return { error,paths: $parser.$refs.paths(), $parser,  }
}

module.exports = {
  deref,
}