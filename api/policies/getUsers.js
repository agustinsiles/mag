module.exports = function(req, res, next) {
  if (!!req.token) {
    var getUsersPermission = _.find(req.token.permissions, function(p) { return p.module === 'user' });
    if (!getUsersPermission) return res.json(403, { err: 'Error' });
    if (!!getUsersPermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
