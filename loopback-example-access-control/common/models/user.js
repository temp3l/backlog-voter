//https://gist.github.com/ritch/6675297
const _ = require("lodash");
var LoopBackContext = require("loopback-context");

module.exports = function(User) {

  // User.afterRemote("login", function(context, token, next) {
  //   User.getRolesById(token.userId, (err, user) => {
  //     if (err) return next(err);
  //     context.res.json(
  //       Object.assign({}, user, { token: token.toJSON() })
  //     );
  //   });
  // });

  User.info = function(id, next) {
    User.getApp(function(err, app) {
      if (err) throw err;
      var RoleMapping = app.models.RoleMapping;
      var Role = app.models.Role;
      var AccessToken = app.models.AccessToken;

      const query = { include:  ['teams', 'reports', 'accessTokens'] };

      User.findById(id, query, function(err, user) {
        if (err) throw err;
        const plainUser = user.toJSON();
        
        RoleMapping.find({ where: { principalId: id } }, function(err,mappings) {
          if (err) throw err;
          var roleIds = _.uniq(mappings.map(roleMapping => roleMapping.roleId));
          console.log(roleIds)
          var conditions = roleIds.map( roleId => ({ id: roleId }));
          console.log(conditions)
          Role.find({ where: { or: conditions } }, function(err, roles) {
            if (err) throw err;
            plainUser.roles = roles;

            return next(null, plainUser );
          })
        });
      });
    });
  };
  User.remoteMethod("info", {
    http: { path: "/info", verb: "get" },
    accepts: { arg: "id", type: "number" },
    returns: { arg: "payload", type: "Object" }
  });
};
