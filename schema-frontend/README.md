# json-schema Playground

http://localhost:4000/api/collection-schemas/protectonaut

http://localhost:4000/api/item-schemas/protectonaut

more [DOCS in ./public/markdown](./public/markdown/README.md)

```
yarn install

yarn run dev

```

I have added a generic backend for the generic forms !

Post a json-schema to the server and have new endpoints generated!

# Server will generate: (no-reload)

- Swagger-config + swagger-ui
- Database-code for all CRUD-operations
- Server-side validation (json-schema)
- GraphQL-Server + Specification (needs reload)

# The client

- generates all Forms, Inputs + validations from that json-schemas
-

http://localhost:3001/graphql
http://localhost:3002/api/openapi.json
