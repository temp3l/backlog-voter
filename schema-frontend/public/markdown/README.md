# API-design / best-practice

- https://philsturgeon.uk/api/2017/07/20/my-vision-for-a-perfect-world-in-api-specification/
  - We like having JSON Schema files be the source of truth (it makes contract testing really easy, and client validation is awesome),
  - At **WeWork**, we use JSON Schema to describe the data models, OpenAPI to describe everything else, then the message being described is usually JSON API.
- https://philsturgeon.uk/api/2018/04/13/openapi-and-json-schema-divergence-solved/
- active Hacker-news: https://news.ycombinator.com/item?id=19660690
- https://philsturgeon.uk/api/2018/03/01/api-specification-workflow-matures/

## converter

- https://github.com/wework/json-schema-to-openapi-schema
- https://www.npmjs.com/package/json-schema-to-yup
  - convert from json-schema to yup then use in formik
- **https://github.com/tlivings/enjoi**

## Postman supports json-schema

- https://blog.getpostman.com/2017/07/28/api-testing-tips-from-a-postman-professional/
- Postman includes the tv4 library, which makes it easy to write tests to verify that your API responses comply with your JSON Schema definitions.

## Links

### editors

- https://jsonschema.net/
- https://regex101.com/

### alternatives ?

- https://www.genivia.com/sjot.html#
- jquense/yup
- poppinss/indicative
- https://de.ryte.com/wiki/JSON-LD

### Links

- https://json-ld.org/
- https://json-schema.org/understanding-json-schema/structuring.html
- https://ajv.js.org/keywords.html</b>
- http://json.schemastore.org/schema-org-contact-point

### samples schemas

- https://github.com/kaiinui/jsonschema-schema.org
- https://raw.githubusercontent.com/glpi-project/inventory_format/master/inventory.schema.json
- https://github.com/glpi-project/inventory_format
- https://www.3gpp.org/FTP/Email_Discussions/CT4/5GC_APIs/TS29571_CommonData.yaml
- https://github.com/Rebilly/ReDoc
- https://github.com/sourcey/spectacle
