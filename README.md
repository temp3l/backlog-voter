# Backend


- https://github.com/gokercebeci/loopback-react
- https://github.com/swagger-api/swagger-js
- https://github.com/diogodoreto/react-loopback

- https://schema.link.fish/downloads/all.json
- https://github.com/link-fish/schema-org-rdf

## JSON-Schema validation

- **validate** (according to the paths definition of the swagger file)
- - request body
- - headers
- - path parameters
- - query parameters

## Parameter-Types

- query parameters, such as /users?role=admin
- path parameters, such as /users/{id}
- header parameters, such as X-MyHeader: Value
- body parameters that describe the body of POST, PUT and PATCH requests (see Describing Request Body)
- form parameters – a variety of body parameters used to describe the payload of requests (application/x-www-form-urlencoded,..)

## Node.js

- A Monorepo of various packages to power OpenAPI in node
- https://github.com/kogosoftwarellc/open-api
- https://github.com/cdimascio/express-openapi-validator
- - An OpenApi validator for ExpressJS that automatically validates API requests using an OpenAPI 3.x specification,

- https://github.com/kogosoftwarellc/open-api/tree/master/packages/express-openapi

* **No Mocks!!!**
* Token based Auth
* **Dynamic RBAC**: [ $owner, $authenticated, $everyone ]
* static roles: [ admin, teamMember, ... **Assona_admin** ]
* custom role-resolver (checks if user is a member of **assona-team** for ressource)
* GraphQL, OpenAPI.spec, SwaggerUI+token
* login/register/auth -users

* Group hasAndBelongsToMany User
* User hasAndBelongsToMany Groups
* admin is \$owner of through-model

## Query-style related modules

- /api/users?filter[include][groups][permissions]
- /api/userGroups?filter={"include":["group"],"where":{"ownerId":4}}
- /api/users?filter[include][groups]&access_token=sjCJZ984g947197b19n34...

## Frontend

- keine deps auf material-ui/bootstrap/antd ...just css classes!
- speichert aktives Token im localStorage
- auth-routes
- benutzt simple REST-Calls (kein graphQL, kein redux)
- no error-handling yet

## Permissions

- admin ALLOW any on [ /users, /accessTokens, /roles, /roleMapping ]
- \$owner ALLOW \* on `own`-ressources [ ..., AccessTokens ]
- \$everybody DENY WRITE on [ ReportItems, Backlog ]
- \$authenticated ALLOW READ on [ ReportItems, Backlog ]
- \$authenticated ALLOW CREATE on [ ReportItems, Backlog ]
- all users limited to `their` items

## ACLs

### Sample ACL (UserModel)

```json
[
  {
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "$everyone",
    "permission": "DENY"
  },
  {
    "principalType": "ROLE",
    "principalId": "$owner",
    "permission": "ALLOW",
    "property": [
      "__create__reports",
      "__get__reports",
      "__destroyById__accessTokens",
      "getRolesById",
      "__get__getSomeAssonaSpecialStuffFromElseWhere"
    ]
  },
  {
    "accessType": "EXECUTE",
    "principalType": "ROLE",
    "principalId": "$authenticated",
    "permission": "ALLOW",
    "property": "__get__getSomeAssonaSpecialStuffFromElseWhere"
  }
]
```

### Programmatic ACLs

```js
MyUser.disableRemoteMethod("create", true);
MyUser.disableRemoteMethod("upsert", true);
MyUser.disableRemoteMethod("updateAll", true);
MyUser.disableRemoteMethod("updateAttributes", false);
//...
MyUser.disableRemoteMethod("__count__accessTokens", false);
MyUser.disableRemoteMethod("__create__accessTokens", false);
//...
MyUser.disableRemoteMethod(
  "__get__getSomeAssonaSpecialStuffFromElseWhere",
  false
);
```

### Access control concepts

| First Header | Second Header                                      | Responsibility                                                           | Example                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Principal    | An entity that can be identified or authenticated. | Represents identities of a request to protected resources.               | A user <br> An application <br> A role (please note a role is also a principal)                                                                                                                                                                                                                                                                            |
| Role         | A group of principals with the same permissions.   | Organizes principals into groups so they can be used.                    | **Dynamic role**: <br>$everyone (for all users)<br>$unauthenticated (unauthenticated users)<br>\$owner (the principal is owner of the model instance), which can be: <br>_ A simple property called userId<br>_ A simple property called owner<br>◦ A relation to a model that extends User.<br>**Static role**: admin (a defined role for administrators) |
| RoleMapping  | Assign principals to roles                         | Statically assigns principals to roles.                                  | Assign user with id 1 to role 1 <br>Assign role ‘admin’ to role 1                                                                                                                                                                                                                                                                                          |
| ACL          | Access control list                                | Controls if a principal can perform a certain operation against a model. | Deny everyone to access the project model. <br>Allow ‘admin’ role to execute find() method on the project model.                                                                                                                                                                                                                                           |

- https://loopback.io/doc/en/lb2/Controlling-data-access.html

## Backlog-Voter

## foo-logic

## App-Setup

1. Admin creates ReportItems
2. Admin creates Backlogs

## APP-Flow

1. User fetches /backlogs
2. User fetches /reportItems
3. User creates _one_ Report for every Backlog
4. A report provides a numeric value for every ReportItem

## Models involved

- ReportItem
- Backlog
- Report
- User

## Endpoints Spec

### /reportItems (ReportItem, no relations)

```js
    { id: 1, name: "winnings", desc: "estimate winnings" },
    { id: 2, name: "roi", desc: "estimate roi" },
```

### /backlogs (Backlog, no relations)

```js
    { id: 1, name: "sprint1", desc: "my first sprint", date: "..." },
    { id: 2, name: "srpint2", desc: "my second sprint", date: "..." },
```

### /reports (Report belogsToOne User, Report belongsToOne Backlog)

```js
    { id: 1, userId: 1, reportId:1, date: "...", data: {...}  },
    { id: 1, userId: 1, reportId:1, date: "...", data: {...}  }
```

### /user (User hasMany reports)

```js
    { id: 1, name: "user1", reports: reportID_1, reportID_2 },
```

## Adding logic to models

- https://loopback.io/doc/en/lb3/Adding-logic-to-models.html
- Remote methods - REST endpoints mapped to Node functions.
- Remote hooks - Logic that triggers when a remote method is executed (before or after).
- Operation hooks - Logic triggered when a model performs create, read, update, and delete operations against a data source.
