var bcrypt = require('bcrypt');

function hashPassword(values, next) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(values.password, salt, function(err, hash) {
      if (err) return next(err);
      values.encryptedPassword = hash;
      next();
    });
  });
}

module.exports = {
  connection: 'MongoDB',
  schema: true,
  attributes: {
    firstName: {
      type: 'string',
      required: false //true
    },
    lastName: {
      type: 'string',
      required: false //true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string'
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    permissions: {
      type: 'array',
      defaultsTo: []
    }
  },
  /*
  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);
        values.encryptedPassword = hash;
        next();
      });
    });
  },
  */
  beforeCreate: function(values, next) {
    hashPassword(values, next);
  },

  beforeUpdate: function(values, next) {
    hashPassword(values, next);
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function(err, match) {
      if (err) cb(err);
      if (match) cb(null, true);
      if (!match) cb(err);
    });
  }
};
