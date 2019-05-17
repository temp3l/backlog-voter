# Models involved

* ReportItem
* Backlog
* Report
* User

## Endpoints Spec

### /reportItems (ReportItem, no relations)

```js
    { id: 1, name: "winnings", desc: "estimate winnings" },
    { id: 2, name: "roi", desc: "estimate roi" },
```

### /backlogs  (Backlog, no relations)

```js
    { id: 1, name: "sprint1", desc: "my first sprint", date: "..." },
    { id: 2, name: "srpint2", desc: "my second sprint", date: "..." },
```

### /reports (Report belogsToOne User, Report belongsToOne Backlog)

```js
    { id: 1, userId: 1, reportId:1, date: "...", data: {...}  },
    { id: 1, userId: 1, reportId:1, date: "...", data: {...}  }
```

### /user   (User hasMany reports)

```js
    { id: 1, name: "user1", reports: reportID_1, reportID_2 },
```

## APP-Setup

1. Admin creates ReportItems
2. Admin creates Backlogs

## APP-Flow

1. User fetches /backlogs
2. User fetches /reportItems
3. User creates exactly one Report for every Backlog
4. A report provides a numeric value for every ReportItem
