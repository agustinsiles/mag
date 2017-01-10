module.exports = function(req, res, next) {
  if (!!req.token && req.token.sid === req.body.id && req.body.email) {
    next();
  } else {
    return res.json(401, { err: 'Error' });
  }
};
