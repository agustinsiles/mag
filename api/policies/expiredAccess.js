module.exports = function(req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0],
          credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) token = credentials;
    } else {
      return res.json(401, { err: 'Error' });
    }
  } else if (req.param('token')) {
    token = req.param('token');
    delete req.query.token;
  } else {
    return res.json(401, { err: 'Error' });
  }

  jwtAuth.verifyAdminAccessToken(token, function(err, token) {
    if (err && err.name === 'TokenExpiredError') {
      next();
    } else {
      return res.json(401, { err: 'Error' });
    }
  });
};
