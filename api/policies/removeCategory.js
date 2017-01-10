module.exports = function(req, res, next) {
  if (!!req.token) {
    var categoryRemovePermission = _.find(req.token.permissions, function(p) { return p.module === 'category' && !!p.remove; });
    if (!categoryRemovePermission) return res.json(403, { err: 'Error' });
    if (!!categoryRemovePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
