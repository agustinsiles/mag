module.exports = function(req, res, next) {
  if (!!req.token) {
    var userEditPermission = _.find(req.token.permissions, function(p) { return p.module === 'user' && !!p.update; });
    if (!userEditPermission) return res.json(403, { err: 'Error' });
    if (!!userEditPermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
