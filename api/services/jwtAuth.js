var jwt = require('jsonwebtoken'),
    jwtAccessAdmin = {
      //expiresIn: ((60 * 1) * 60) * 0.1,
      expiresIn: 60 * 1,
      secret: "Dv0r4k89rc4bu18894a0!",
      algorithm : "HS256",
      issuer : "mag",
      audience : "audiecetest"
    },
    jwtRefreshAdmin = {
      expiresIn: ((60 * 1) * 60) * 12,
      secret: "Dv0AAAAaaasasasasr4k89rc4bu18894a0!",
      algorithm : "HS256",
      issuer : "mag",
      audience : "audiecetest"
    },
    jwtPublicAccess = {
      expiresIn: 60 * 1,
      secret: "fafafa",
      algorithm : "HS256",
      issuer : "mag",
      audience : "public"
    };
module.exports.issueAdminAccessToken = function(payload) {
  return jwt.sign(payload, jwtAccessAdmin.secret, {
      algorithm: jwtAccessAdmin.algorithm,
      expiresIn: jwtAccessAdmin.expiresIn,
      issuer: jwtAccessAdmin.issuer,
      audience: jwtAccessAdmin.audience
    });
};

module.exports.issueAdminRefreshToken = function(payload) {
  return jwt.sign(payload, jwtRefreshAdmin.secret, {
      algorithm: jwtRefreshAdmin.algorithm,
      expiresIn: jwtRefreshAdmin.expiresIn,
      issuer: jwtRefreshAdmin.issuer,
      audience: jwtRefreshAdmin.audience
    });
};

module.exports.verifyAdminAccessToken = function(token, verified) {
  return jwt.verify(token, jwtAccessAdmin.secret, {
      algorithm: jwtAccessAdmin.algorithm,
      ignoreExpiration: false,
      issuer: jwtAccessAdmin.issuer,
      audience: jwtAccessAdmin.audience
    },
    verified
  );
};

module.exports.verifyAdminRefreshToken = function(token, verified) {
  return jwt.verify(token, jwtRefreshAdmin.secret, {
      algorithm: jwtRefreshAdmin.algorithm,
      ignoreExpiration: false,
      issuer: jwtRefreshAdmin.issuer,
      audience: jwtRefreshAdmin.audience
    },
    verified
  );
};

module.exports.issuePublicAccessToken = function(payload) {
  return jwt.sign(payload, jwtPublicAccess.secret, {
      algorithm: jwtPublicAccess.algorithm,
      expiresIn: jwtPublicAccess.expiresIn,
      issuer: jwtPublicAccess.issuer,
      audience: jwtPublicAccess.audience
    });
};

module.exports.verifyPublicAccessToken = function(token, verified) {
  return jwt.verify(token, jwtPublicAccess.secret, {
      algorithm: jwtPublicAccess.algorithm,
      ignoreExpiration: false,
      issuer: jwtPublicAccess.issuer,
      audience: jwtPublicAccess.audience
    },
    verified
  );
};
