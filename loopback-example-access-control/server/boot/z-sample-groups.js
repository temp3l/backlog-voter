/*
GET /appointments?filter={"include":["patient"],"where":{"physicianId":2}}    
    https://loopback.io/doc/en/lb2/HasManyThrough-relations.html

    http://localhost:5000/api/userGroups?filter={%22include%22:[%22group%22],%22where%22:{%22userId%22:4}}
    http://localhost:5000/api/userGroups?filter={%22include%22:[%22user%22],%22where%22:{%22groupId%22:1}}
    
    http://localhost:5000/api/userGroups?filter[include][user]&filter[include][group]
    ?filter={"include":["group"],"where":{"userId":4}}
    ?filter[include]=group&filter[include]=owner
    http://localhost:5000/api/userGroups?filter[include][user][groups]
    ?filter[include][user][groups]
    ?filter[include][user][groups]
    ?filter[include][user][groups]
*/

module.exports = function(app) {
  console.log("########### Create UserGroups if needed  ###############");
  const _ = require('lodash');
  const faker = require("faker");

  const User = app.models.user;
  const Group = app.models.Group;
  const UserGroup = app.models.UserGroup;
  const _sampleGroups = [
    { name: "ADMIN", descr: "admin group" },
    { name: "USER", descr: "user groups" }
  ];

  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  const fakeGroup = () => ({
    name: faker.internet.userName().toUpperCase(),
    descr: faker.lorem.words()
  });
  

  Group.count({}, (err, count) => {
    console.log("Groups: ", count);
    if (count >100) {
      console.log("not mocking UserGroups!");
      return true;
    }

    Group.create( _.times(50, () => fakeGroup()), (err,res) => {
      createGroupsAndAssociateUsers();
      setTimeout(() => {
        associateAllGroupsWithAnotherUser();
      }, 600);
    });

    
    
  });

  const createGroupsAndAssociateUsers = next => {
    User.find({}, (err, users) => {
      users.forEach(user => {
        Group.create(fakeGroup(), (err, group) => {
          UserGroup.create(
            { userId: user.id, groupId: group.id },
            (err, userGroup) => console.log
          );
        });
      });
    });
  };
  const associateAllGroupsWithAnotherUser = () => {
    Group.find({}, (err, groups) => {
      groups.forEach(group => {
        User.find({}, (err, users) => {
          let userId = users[getRandomInt(users.length - 1)].id;
          UserGroup.create({ userId, groupId: group.id, ownerId: userId }, console.log);
        });
      });
    });
  };
};
