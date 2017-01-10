module.exports = function(req, res, next) {
  if (!!req.token) {
    var productCreatePermission = _.find(req.token.permissions, function(p) { return p.module === 'product' && !!p.create; });
    if (!productCreatePermission) return res.json(403, { err: 'Error' });
    if (!!productCreatePermission) next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
