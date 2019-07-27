## charts

- https://www.npmtrends.com/loopback-vs-hapi-vs-koa

## loopback / validation-workflow

https://github.com/strongloop/loopback-next/blob/master/docs/site/Model.md

# request validation nutshell

- schema constructed from @decorators
- https://stackoverflow.com/questions/54832255/how-to-specify-minimum-and-maximum-length-for-fields-in-loopback-4
- https://github.com/strongloop/loopback-next/blob/master/docs/site/Parsing-requests.md#request-body
- default HTTP sequence, it parses arguments from an incoming request and uses them as inputs to invoke the corresponding ntroller method.

## This action contains 3 steps:

1. Parses arguments from request query, body, path and header according to the operation's OpenAPI specification.
2. Coerces parameters from string to its corresponding JavaScript run-time type.
3. Performs validation on the parameters and body data.

# Validation Works like this: (loopback.io)

```js
import {Todo} from './models'; // class definition
  @put('/todos/{id}')
  async replaceTodo(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<boolean> {
    return await this.todoRepo.replaceById(id, todo);
  }
```

1. PUT on /todo/{id}-Instance => Use well-defined Spec for put-body validation
2. choose validation on model object
3. ... content-types

## Results in validation-Schema:

- https://github.com/strongloop/loopback-next/blob/master/docs/site/Parsing-requests.md#request-body

```js
const requestBodyObject = {
  description: 'data',
  content: {
    'application/x-www-form-urlencoded': {
      schema: {
        type: 'object',
        properties: {
          name: {type: 'string'},
          location: {
            type: 'object',
            properties: {
              lat: {type: 'number'},
              lng: {type: 'number'},
            },
          },
          tags: {
            type: 'array',
            items: {type: 'string'}, },},},},},
```

![loopback-overview.png](/images/loopback-overview.png)
