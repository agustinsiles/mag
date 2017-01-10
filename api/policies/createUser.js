module.exports = function(req, res, next) {
  if (!!req.token) {
    var userCreatePermission = _.find(req.token.permissions, function(p) { return p.module === 'user' && !!p.create; });
    if (!userCreatePermission) return res.json(403, { err: 'Error' });
    if (!!userCreatePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
