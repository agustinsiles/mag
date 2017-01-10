module.exports = function(req, res, next) {
  if (!!req.token) {
    var productRemovePermission = _.find(req.token.permissions, function(p) { return p.module === 'product' && !!p.remove; });
    if (!productRemovePermission) return res.json(403, { err: 'Error' });
    if (!!productRemovePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
