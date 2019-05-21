module.exports = function(app) {
  console.log("no mocking users");

  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;
  var Backlog = app.models.Backlog;
  var ReportItem = app.models.ReportItem;

  var faker = require("faker");
  var _ = require("lodash");

  User.count({}, (err, c) => console.log("user: ", c));
  Role.count({}, (err, c) => console.log("roles: ", c));
  Team.count({}, (err, c) => console.log("teams: ", c));

  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  const fakeUser = () => ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: "xxx"
  });

  const _users = [
    { username: "John", email: "john@doe.com", password: "xxx" },
    { username: "Jane", email: "jane@doe.com", password: "xxx" },
    { username: "Bob", email: "bob@doe.com", password: "xxx" },
    { username: "mult", email: "mult@doe.com", password: "xxx" },
    { username: "aaa", email: "aaa@doe.com", password: "xxx" },
    { username: "bbb", email: "bbb@doe.com", password: "xxx" },
    { username: "ccc", email: "ccc@doe.com", password: "xxx" },
    { username: "ddd", email: "ddd@doe.com", password: "xxx" },
    { username: "eee", email: "eee@doe.com", password: "xxx" }
    //..._.times(10, () => fakeUser())
  ].map(user => {
    return Object.assign(
      {},
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: user.username,
        //email: faker.internet.email(),
        status: faker.random.boolean() === true ? "active" : "inactive",
        authSource: faker.random.boolean() === true ? "directory" : "local",
        expiry: faker.date.future(),
        locked: faker.random.boolean(),
        lastLogin: faker.date.past()
      },
      user
    );
  });

  const _roles = ["USER", "ADMIN", "MANGER"]
    .map(role => ["ASSONA", "SNT", "GMIT"].map(str => str + "_" + role))
    .flat()
    .map(r => ({ name: r, description: faker.lorem.words() }));

  const _projects = ["VIEW", "CREATE", "MODIFY", "DELETE"]
    .map(perm => ["TICKET", "WIKI", "CONTRACT"].map(str => str + "-" + perm))
    .flat()
    .map(p => ({ name: p, balance: getRandomInt(100) }));

  ReportItem.count({}, function(err, count) {
    if (count > 0) return console.log("\nReportItems already exist: ", count);

    ReportItem.create([
      { name: "winnings", description: "estimate winnings" },
      { name: "potential", description: "estimate potential" },
      { name: "dependence", description: "estimate dependence" },
      { name: "image", description: "estimate image" },
      {
        name: "employeeSatisfaction",
        description: "estimate employeeSatisfaction"
      },
      {
        name: "customerSatisfaction",
        description: "estimate customerSatisfaction"
      },
      {
        name: "partnerSatisfaction",
        description: "estimate partnerSatisfaction"
      },
      { name: "eco", description: "estimate eco" },
      { name: "roi", description: "estimate roi" }
    ]);
  });

  Backlog.count({}, function(err, count) {
    if (count > 0) return console.log("RoleItems already exist: ", count);
    Backlog.create([
      {
        name: "First Backlog",
        description: "This backlog is about usefull stuff!"
      },
      {
        name: "Second Backlog",
        description: "Please report on this very tricky stuff!"
      },
      {
        name: "Third Backlog",
        description: "This backlog is about less tricky stuff"
      }
    ]);
  });

  User.count({}, function(err, count) {
    if (count > 0) return console.log("Users already exist: ", count);

    User.create(_users, function(err, users) {
      if (err) throw err;
      console.log("Created users:", users);

      Role.create(_roles, (err, roles) => {
        if (err) throw err;
        console.log("created roles: ", roles);
        roles.forEach(role => {
          role.principals.create(
            {
              principalType: RoleMapping.USER,
              principalId: users[getRandomInt(users.length - 1)].id
            },
            (err, principal) => {
              if (err) throw err;
              console.log("Created principal:", principal);
            }
          );
        });
      });

      // create project 1 and make john the owner
      users[0].projects.create(
        { name: "project1", balance: 100 },
        (err, project) => {
          if (err) throw err;
          console.log("Created project:", project);

          Team.create(
            [
              { ownerId: project.ownerId, memberId: users[0].id },
              { ownerId: project.ownerId, memberId: users[1].id }
            ],
            (err, team) => {
              if (err) throw err;
              console.log("Created team:", team);
            }
          );
        }
      );

      //create project 2 and make jane the owner
      users[1].projects.create(
        { name: "project2", balance: 100 },
        (err, project) => {
          if (err) throw err;
          console.log("Created project:", project);

          //add team members
          Team.create(
            [
              { ownerId: users[1].id, memberId: users[1 + 1].id },
              { ownerId: users[2].id, memberId: users[2 + 1].id },
              { ownerId: users[3].id, memberId: users[3 + 1].id },
              { ownerId: users[4].id, memberId: users[4 + 1].id },
              { ownerId: users[5].id, memberId: users[5 + 1].id }
            ],
            (err, team) => {
              if (err) throw err;
              console.log("Created team:", team);
            }
          );
        }
      );

      Role.create({ name: "admin" }, (err, role) => {
        if (err) throw err;
        console.log("Created role:", role);
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[2].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
        // make mult an admin
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[3].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[3].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
      });

      //Role.create(['WIKI_VIEW', 'WIKI_EXPLOIT', 'BUFFER_OVERRUN', 'TICKET_ADMIN', 'ROADMAP_EDIT', 'VSERVER_CREATE', 'CLUSTER_SHUTDOWN'},])

      //make john SNT-admin
      Role.create({ name: "SNT-admin" }, (err, role) => {
        if (err) throw err;
        console.log("Created role:", role);
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[0].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[3].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[4].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
        role.principals.create(
          { principalType: RoleMapping.USER, principalId: users[5].id },
          (err, principal) => {
            if (err) throw err;
            console.log("Created principal:", principal);
          }
        );
      });
    });
  });
};
