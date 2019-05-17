// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;
  var Backlog = app.models.Backlog;
  var ReportItem = app.models.ReportItem;

  ReportItem.create([
    {"name": "winnings", "desc": "estimate winnings"},
    {"name": "potential", "desc": "estimate potential"},
    {"name": "dependence", "desc": "estimate dependence"},
    {"name": "image", "desc": "estimate image"},
    {"name": "employeeSatisfaction", "desc": "estimate employeeSatisfaction"},
    {"name": "customerSatisfaction", "desc": "estimate customerSatisfaction"},
    {"name": "partnerSatisfaction", "desc": "estimate partnerSatisfaction"},
    {"name": "eco", "desc": "estimate eco"},
    {"name": "roi", "desc": "estimate roi"},
  ]);
  
  Backlog.create([
    {name: "First Backlog", desc: "This backlog is about usefull stuff!"},
    {name: "Second Backlog", desc: "Please report on this very tricky stuff!"},
    {name: "Third Backlog", desc: "This backlog is about less tricky stuff"},
  ]);

  User.create([
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

    // create project 1 and make john the owner
    users[0].projects.create({
      name: 'project1',
      balance: 100
    }, function(err, project) {
      if (err) throw err;

      console.log('Created project:', project);

      // add team members
      Team.create([
        {ownerId: project.ownerId, memberId: users[0].id},
        {ownerId: project.ownerId, memberId: users[1].id}
      ], function(err, team) {
        if (err) throw err;

        console.log('Created team:', team);
      });
    });

    //create project 2 and make jane the owner
    users[1].projects.create({
      name: 'project2',
      balance: 100
    }, function(err, project) {
      if (err) throw err;

      console.log('Created project:', project);

      //add team members
      Team.create({
        ownerId: project.ownerId,
        memberId: users[1].id
      }, function(err, team) {
        if (err) throw err;

        console.log('Created team:', team);
      });
    });

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });
  });
};
