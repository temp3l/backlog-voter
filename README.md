# Features

## Backend

- **No Mocks!!!** => PostgresQL 
- Token based Auth
- **Dynamic RBAC**: [ $owner, $authenticated, $everyone ]
- static roles: [ admin, teamMember, Assona_admin ]
- GraphQL, OpenAPI.spec, SwaggerUI+token
- login/register/auth -users

## Frontend

- keine deps auf material-ui/bootstrap/antd ...just css classes!
- speichert aktives Token im localStorage
- benutzt simple REST-Calls (kein graphQL, kein redux)
- no error-handling yet

# Permissions

- admin ALLOW any on [ /users, /accessTokens, /roles, /roleMapping  ]
- $owner ALLOW \* on `own`-ressources [ ..., AccessTokens ]
- \$everybody DENY WRITE on [ ReportItems, Backlog ]
- \$authenticated ALLOW READ on [ ReportItems, Backlog ]
- \$authenticated ALLOW CREATE on [ ReportItems, Backlog ]
- all users limited to `their` items

# Sample ACL (UserModel)

```json
[,{
  "accessType": "*",
  "principalType": "ROLE",
  "principalId": "$everyone",
  "permission": "DENY"
},{
  "principalType": "ROLE",
  "principalId": "$owner",
  "permission": "ALLOW",
  "property": [
    "__create__reports",
    "__get__reports",
    "__destroyById__accessTokens",
    "getRolesById",
    "__get__getSomeAssonaSpecialStuffFromElseWhere"]
},{
  "accessType": "EXECUTE",
  "principalType": "ROLE",
  "principalId": "$authenticated",
  "permission": "ALLOW",
  "property": "__get__getSomeAssonaSpecialStuffFromElseWhere"
},]
```

# fine-grained Programmatic ACLs

```js
MyUser.disableRemoteMethod("create", true);
MyUser.disableRemoteMethod("upsert", true);
MyUser.disableRemoteMethod("updateAll", true);
MyUser.disableRemoteMethod("updateAttributes", false);
//...
MyUser.disableRemoteMethod('__count__accessTokens', false);
MyUser.disableRemoteMethod('__create__accessTokens', false);
MyUser.disableRemoteMethod('__delete__accessTokens', false);
MyUser.disableRemoteMethod('__destroyById__accessTokens', false);
MyUser.disableRemoteMethod('__findById__accessTokens', false);
MyUser.disableRemoteMethod('__get__accessTokens', false);
MyUser.disableRemoteMethod('__updateById__accessTokens', false);
//...
MyUser.disableRemoteMethod('__get__getSomeAssonaSpecialStuffFromElseWhere', false);
```


# App-Setup

1. Admin creates ReportItems
2. Admin creates Backlogs

# APP-Flow

1. User fetches /backlogs
2. User fetches /reportItems
3. User creates Reports that belongTo one Backlog
4. A report provides a numeric value for every ReportItem

# Models involved

- ReportItem
- Backlog
- Report
- User


First Header  | Second Header | Responsibility  | Example 
------------  | ------------- | -------------   | ------------- 
Principal	    | An entity that can be identified or authenticated. | Represents identities of a request to protected resources. | A user <br> An application <br> A role (please note a role is also a principal)
Role	        | A group of principals with the same permissions. |	Organizes principals into groups so they can be used.	 | **Dynamic role**: <br>$everyone (for all users)<br>$unauthenticated (unauthenticated users)<br>$owner (the principal is owner of the model instance), which can be: <br>* A simple property called userId<br>* A simple property called owner<br>◦ A relation to a model that extends User.<br>**Static role**: admin (a defined role for administrators)  |
RoleMapping	  | Assign principals to roles	    | Statically assigns principals to roles.	  | Assign user with id 1 to role 1 <br>Assign role ‘admin’ to role 1 |
ACL           |	Access control list	            | Controls if a principal can perform a certain operation against a model.	| Deny everyone to access the project model. <br>Allow ‘admin’ role to execute find() method on the project model.




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
