module.exports = function(req, res, next) {
  if (!!req.token) {
    var userRemovePermission = _.find(req.token.permissions, function(p) { return p.module === 'user' && !!p.remove; });
    if (!userRemovePermission) return res.json(403, { err: 'Error' });
    if (!!userRemovePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
