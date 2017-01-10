module.exports = function(req, res, next) {
  if (!!req.token) {
    var categoryCreatePermission = _.find(req.token.permissions, function(p) { return p.module === 'category' && !!p.create; });
    if (!categoryCreatePermission) return res.json(403, { err: 'Error' });
    if (!!categoryCreatePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
