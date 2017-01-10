module.exports = function(req, res, next) {
  if (!!req.token) {
    var productUpdatePermission = _.find(req.token.permissions, function(p) { return p.module === 'product' && !!p.update; });
    if (!productUpdatePermission) return res.json(403, { err: 'Error' });
    if (!!productUpdatePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
