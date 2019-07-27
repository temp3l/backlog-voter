# Charts

- https://json-schema.org/implementations.html
- http://schemastore.org/json/

## Client / Server

- json-schema-to-yup
- json-schema-to-openapi-schema, yam

## Spec composition ( UIs, Forms, Interfaces)

- Can be composed from many fragments

## json-schema-ref-parser to the rescue!

- Parse, Resolve, and Dereference JSON Schema \$ref pointers
- Use JSON or YAML schemas — or even a mix of both!
- Bundles all referenced files/URLs into a single schema that only has internal \$ref pointers. This lets you split-up your schema however you want while you're building it, but easily combine all those files together when it's time to package or distribute the schema to other people. The resulting schema size will be small, since it will still contain internal JSON references rather than being fully-dereferenced.
