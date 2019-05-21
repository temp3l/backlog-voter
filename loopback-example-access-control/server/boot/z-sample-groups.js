/*
GET /appointments?filter={"include":["patient"],"where":{"physicianId":2}}    
    https://loopback.io/doc/en/lb2/HasManyThrough-relations.html

    http://10.50.2.103:4000/api/users?filter={"include":["group"],"where":{"userId":4}}
    http://10.50.2.103:4000/api/users?filter[include][groups][permissions]
    http://10.50.2.103:4000/api/users?filter[include]=activities&filter[include][groups][permissions]
*/

module.exports = function(app) {
  console.log("########### Create UserGroups if needed  ###############");
  const _ = require("lodash");
  const faker = require("faker");

  const User = app.models.user;
  const Permission = app.models.Permission;
  const GroupPermission = app.models.GroupPermission;
  const Group = app.models.Group;
  const Activity = app.models.Activity;
  const UserActivity = app.models.UserActivity;
  const UserGroup = app.models.UserGroup;
  const _sampleGroups = [
    { name: "ADMIN", description: "admin group" },
    { name: "USER", description: "user groups" }
  ];

  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  const fakeGroup = () => ({
    name: faker.internet.userName().toUpperCase(),
    description: faker.lorem.words()
  });
  const fakePermission = () => ({
    name: "PERM_" + faker.hacker.verb().toUpperCase(),
    description: faker.hacker.verb()
  });

  const fakeActivity = () => ({
    name: faker.finance.transactionType(),
    date: faker.date.past()
  });

  Activity.count({}, (err, count) => {
    if (count > 0) return true;

    Activity.create(_.times(50, () => fakeActivity()), (err, activities) => {
      User.find({}, (err, users) => {
        users.forEach(user => {
          UserActivity.create(
            _.times(
              10,
              () => {
                return {
                  userId: users[getRandomInt(users.length - 1)].id,
                  activityId: activities[getRandomInt(activities.length - 1)].id
                };
              },
              (err, res) => console.log
            )
          );
        });
      });
    });
  });

  Group.count({}, (err, count) => {
    console.log("Groups: ", count);
    if (count > 0) {
      console.log("not mocking UserGroups!");
      return true;
    }

    Group.create(_.times(50, () => fakeGroup()), (err, res) => {
      createGroupsAndAssociateUsers();
      setTimeout(() => {
        associateAllGroupsWithAnotherUser();

        setTimeout(() => {
          createPermissions(); //bloody tired 'dont give a shit
        }, 1000);
      }, 600);
    });
  });

  const createPermissions = () => {
    Permission.count({}, (err, count) => {
      if (count > 0) return true;
      Permission.create(
        _.times(20, () => fakePermission()),
        (err, permissions) => {
          console.log("created Perms ", err, permissions);
          UserGroup.find({}, (err, ugs) => {
            console.log("USERGROUPS: " + ugs.length);

            ugs.forEach(ug => {
              _.times(getRandomInt(10), () =>
                GroupPermission.create(
                  {
                    permissionId:
                      permissions[getRandomInt(permissions.length - 1)].id,
                    groupId: ug.id
                  },
                  console.log
                )
              );
            });
          });
        }
      );
    });
  };

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
          UserGroup.create(
            { userId, groupId: group.id, ownerId: 3 },
            console.log
          );
        });
      });
    });
  };
};
