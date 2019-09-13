# https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven
# Harvest, Yield, and Scalable Tolerant Systems
# https://reactjs.org/docs/thinking-in-react.html

## SSOT - The Path to Standardization

- Specification
- - Describes existing data 'guided'
- Validation
- - Quality ensurance
- - Automated testing
- Documentation
- - human- and machine- readable ?
  ---

### Benefits

- Premium Clients
- ...
- 100% sync

<ul>
  <Appear>
    <li>Docs</li>
    <li>Clients (WebForms)</li>
    <li>EndPoints</li>
    <li>Services</li>
    <li>Store</li>
    <li>UnitTest</li>
    <li>IntegrationsTest</li>
  </Appear>
</ul>


### Assona-API as a Product

- consistent design patterns + re-usability
- API-ToolChain
- Mocking + Stubbing + Templating => Agile
- - Auth
- - DB
- - Validation
- - Premium-Mocks / Examples
- - Integration
- avoid case specific APIs!!!


---

## Thinking in React

- https://reactjs.org/docs/thinking-in-react.html
https://reactjs.org/docs/thinking-in-react.html

### Step 1: Break The UI Into A Component Hierarchy

- FilterableProductTable
- - SearchBar
- - ProductTable
- - - ProductCategoryRow
- - - ProductRow

### Step 2: Build A Static Version in React

### Step 3: Identify The Minimal (but complete) Representation Of UI State

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it remain unchanged over time? If so, it probably isn’t state.
3. Can you compute it based on any other state or props in your component?
- - If so, it isn’t state.

### Step 4: Identify Where Your State Should Live

### Step 5: Add Inverse Data Flow

---

# Gatsby

- Page Template
- http://bradfrost.com/wp-content/uploads/2013/06/template1.jpg
- http://bradfrost.com/blog/post/atomic-web-design/

my-blog
├── content
│   ├── assets
│   │   └── avatar.png
│   └── posts
│       ├── hello-world.mdx
│       └── my-second-post.mdx
├── src
│   └── gatsby-theme-blog
│       ├── components
│       │   └── bio-content.js
│       └── gatsby-plugin-theme-ui
│           └── colors.js
├── gatsby-config.js
└── package.json

# Blog

.
├── gatsby-config.js
├── package.json
└── src
    ├── html.jsx
    ├── pages
    │   ├── index.jsx
    │   └── posts
    │       ├── 01-01-2017
    │       │   └── index.md
    │       ├── 01-02-2017
    │       │   └── index.md
    │       └── 01-03-2017
    │           └── index.md
    ├── templates
        └── post.jsx





---



- https://loopback.io/doc/en/lb4/Loopback-component-authorization.html
- https://github.com/strongloop/loopback-next/issues/3450
- https://github.com/strongloop/loopback-next/issues/3482
- datasource, model, repository, controller

- https://opensource.zalando.com/restful-api-guidelines/#common-data-types
* {MUST}: Use a Common Money Object [173]
* {MUST}: Use Problem JSON [176] application/problem+json
* {MUST} Provide API Audience
* {MUST} Write APIs in U.S. English
* {MUST} Provide API Identifiers
* {SHOULD} Use Simple Hypertext Controls for Pagination and Self-References
* {MUST} Not Use Link Headers with JSON Entities
* {MUST}: Define Format for Type Number and Integer [171]

## https://github.com/zalando/restful-api-guidelines/blob/e2566543ffb4ad613583c5e3fbd644125ae5df09/chapters/security.adoc

## https://opensource.zalando.com/restful-api-guidelines/#226

## alle properties valid ? https://opensource.zalando.com/restful-api-guidelines/#json-guidelines

## https://opensource.zalando.com/restful-api-guidelines/#146

## https://opensource.zalando.com/restful-api-guidelines/#171

## https://loopback.io/doc/en/lb3/Include-filter.html

## Creating REST Routes

`https://strongloop.com/strongblog/loopback4-openapi-cli/`

**Interceptors!!!!!!!**

https://loopback.io/doc/en/lb4/Interceptors.html

```jsx
// global APP-wide interception
// https://loopback.io/doc/en/lb4/Defining-the-API-using-design-first-approach.html

// https://loopback.io/doc/en/lb4/apidocs.rest.validaterequestbody.html

// https://strongloop.com/strongblog/loopback4-openapi-cli/

export declare function validateRequestBody(
  body: RequestBody, requestBodySpec?: RequestBodyObject,
  globalSchemas?: SchemasObject,  options?: RequestBodyValidationOptions): void;

app
  .bind('caching-interceptor')
  .toProvider(CachingInterceptorProvider)
  .apply(asInterceptor);
```

# There are three distinct approaches for defining your REST Routes:

- With an OpenAPI specification object
- Using partial OpenAPI spec fragments with the Route constructor
- Using route decorators on controller methods

## Parameters

- body
- form data
- query string
- header
- path (url)

# Route to Controller

- **this.route('get', '/greet', spec, MyController, 'greet');**

```jsx

!!! OperationObject
https://loopback.io/doc/en/lb4/Defining-the-API-using-design-first-approach.html
https://loopback.io/doc/en/lb4/Defining-the-API-using-design-first-approach.html
const spec = {
  parameters: [{name: 'name', schema: {type: 'string'}, in: 'query'}],
  responses: {
    '200': {
      description: 'greeting text',
      content: {
        'application/json': {
          schema: {type: 'string'},
        },
      },
    },
  },
};
```

```jsx
class ContractController {
  @post('/contracts', spec)
  contract(contract: JobradContract) {
    return ${contract};
  }
}
```

# Specifying Controller APIs

```jsx
this.api({
  openapi: '3.0.0',
  info: {
    title: 'Hello World App',
    version: '1.0.0',
  },
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'MyController',
        parameters: [{name: 'name', schema: {type: 'string'}, in: 'query'}],
        responses: {
          '200': {
            description: 'greeting text',
            content: {
              'application/json': {
                schema: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
});
this.controller(MyController);
```

```jsx
@api({
  openapi: '3.0.0',
  info: {
    title: 'Hello World App',
    version: '1.0.0',
  },
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'MyController',
        parameters: [{name: 'name', schema: {type: 'string'}, in: 'query'}],
        responses: {
          '200': {
            description: 'greeting text',
            content: {
              'application/json': {
                schema: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
})
class MyController {
  greet(name: string) {
    return `hello ${name}`;
  }
}
app.controller(MyController);
```

### container with boxes:

http://localhost:3000/containers/5d4f697f952fa71bd843be83

http://localhost:3000/containers?filter={%22include%22:%20[{%22relation%22:%20%22boxes%22}]}

### include boxes

http://localhost:3000/containers?filter={"include": [{"relation": "boxes"}]}
http://localhost:3000/containers?filter={"where": {"id": "1"},"include": [{"relation": "boxes"}] }

### singleBox

http://localhost:3000/boxes?filter={"where": {"id": "5d4f78367eb7502ad082078c"}}
http://localhost:3000/boxes/5d4f78367eb7502ad082078c

http://localhost:3000/containers/5d4f6983952fa71bd843be88/boxes

http://localhost:3000/containers?filter={"includeurl: "/contracts?filter[%22contracts.contractId%22]=12",
": [{"relation": "boxes", "scope": {"fields": ["id"]}}], "where": {"id": "1"}}

```json
{
  "include": [
    {
      "relation": "boxes",
      "scope": {
        "where": {"size": "242424"},
        "limit": 1
      }
    }
  ],
  "where": {
    "id": "2"
  }
}
```

http://localhost:3000/containers?filter={ "include": [{"relation": "boxes", "scope": { "where": {"size": "242424"}}}],"where": {"id": "2"}}
