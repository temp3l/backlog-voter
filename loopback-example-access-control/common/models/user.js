//https://gist.github.com/ritch/6675297
const _ = require("lodash");
var LoopBackContext = require('loopback-context');

module.exports = function(User) {


  User.getRolesById = function(id, next) {

    User.getApp(function(err, app) {
      if (err) throw err;
      var RoleMapping = app.models.RoleMapping;
      var Role = app.models.Role;
      var AccessToken = app.models.AccessToken;
      
      User.findById(id, function(err, user) {
        if (err) throw err;

        RoleMapping.find({ where: { principalId: id } }, function(
          err,
          roleMappings
        ) {
          var roleIds = _.uniq(
            roleMappings.map(function(roleMapping) {
              return roleMapping.roleId;
            })
          );
          var conditions = roleIds.map(function(roleId) {
            return { id: roleId };
          });
          Role.find({ where: { or: conditions } }, function(err, roles) {
            if (err) throw err;
            var roleNames = roles.map(function(role) {
              return role.name;
            });

            AccessToken.find({where: { userId: id}},function(err,tokens) {
              //console.log(tokens);
              //tokens
              next(null, Object.assign({}, { tokens, roles: roleNames, currentUser: user }));
            })
            
          });
        });
      });
    });
  };
  User.remoteMethod("getRolesById", {
    http: { path: "/getRolesById", verb: "get" },
    accepts: { arg: "id", type: "number" },
    returns: { arg: "payload", type: "Object" }
  });
};
