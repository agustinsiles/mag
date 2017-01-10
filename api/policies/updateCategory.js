module.exports = function(req, res, next) {
  if (!!req.token) {
    var categoryUpdatePermission = _.find(req.token.permissions, function(p) { return p.module === 'category' && !!p.update; });
    if (!categoryUpdatePermission) return res.json(403, { err: 'Error' });
    if (!!categoryUpdatePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
