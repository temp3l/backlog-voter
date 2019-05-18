# Features

- Token based Auth
- Dynamic RBAC: [ admin, $owner, teamMember, $authenticated, $everyone ]
- No Mocks! PostgresQL ready

# Permissions

- admin ALLOW any on [ ReportItems, Report, Backlog ]
- \$everybody DENY WRITE on [ ReportItems, Backlog ]
- \$authenticated ALLOW READ on [ ReportItems, Backlog ]
- \$authenticated ALLOW CREATE on [ ReportItems, Backlog ]
- \$authenticated limited to HIS items

# Sample ACl (UserModel)

```json
{
  "principalType": "ROLE",
  "principalId": "$owner",
  "permission": "ALLOW",
  "property": [
    "__create__reports",
    "__get__reports",
    "__destroyById__accessTokens",
    "getRolesById"
  ]
}
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

## State Management

- https://stackoverflow.com/questions/49938568/how-to-share-application-state-between-react-router-v4-routes/49939152

```js
You could manage data without redux if either of the scenarios matched your arrangement of components:

Parent to child relationship: Using Props
Child to parent relationship: Using callbacks
Siblings with a common parent.
But neither of the relationships satisfies your arrangement of the components since the two components are new root components.

When the components can't communicate between any sort of parent-child relationship, the documentation recommends setting up a global event system.
```
