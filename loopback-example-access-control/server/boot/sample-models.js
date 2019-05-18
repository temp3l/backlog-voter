module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;
  var Backlog = app.models.Backlog;
  var ReportItem = app.models.ReportItem;

  ReportItem.find({},function(err,res){
    if(res.length>0) return console.log('\nReportItems already exist: ' + res.length)
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
  });

  ReportItem.find({},function(err,res){
    if(res.length>0) return console.log('RoleItems already exist: ' + res.length)
    Backlog.create([
    {name: "First Backlog", desc: "This backlog is about usefull stuff!"},
    {name: "Second Backlog", desc: "Please report on this very tricky stuff!"},
    {name: "Third Backlog", desc: "This backlog is about less tricky stuff"},
  ]);
  });

  User.find({},function(err,res){
    if(res.length>0) return console.log('Users already exist: ' + res.length)
    
    User.create([
      {username: 'John', email: 'john@doe.com', password: 'xxx'},
      {username: 'Jane', email: 'jane@doe.com', password: 'xxx'},
      {username: 'Bob', email: 'bob@projects.com', password: 'xxx'}
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
  })
};
