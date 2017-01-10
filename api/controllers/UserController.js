var Promise = require('bluebird');

function getUsers() {
	return new Promise(function(resolve, reject) {
    //User.find({}).then(resolve).catch(reject);
		User.find({}).then(function(users) {
			_.forEach(users, function(u, x) {
				delete users[x].encryptedPassword;
			});
			resolve(users);
		}).catch(reject);
  });
}

module.exports = {

	create: function(req, res) {
		User.create(req.body).then(function() {
			getUsers().then(function(users) {
				return res.json(users);
			}).catch(function(err) {
				return res.json(err.status, { err: err });
			});
		}).catch(function(err) {
			return res.json(err.status, { err: err });
		});
	},

	getAll: function(req, res) {
		getUsers().then(function(users) {
			res.json(users);
		}).catch(function(err) {
			res.json(err.status, { err: err });
		});
	},

	update: function(req, res) {
		var user = req.allParams();
		User.update(user.id, user).then(function() {
			getUsers().then(function(users) {
				res.json(users);
			}).catch(function(err) {
				res.json(err.status, { err: err });
			});
		});
	},

	remove: function(req, res) {
		User.destroy(req.allParams().id).then(function() {
			getUsers().then(function(users) {
				res.json(users);
			}).catch(function(err) {
				res.json(err.status, { err: err });
			});
		});
	},

	changePassword: function(req, res) {
		User.findOne({ id: req.param('id'), email: req.param('email') }).then(function(user) {
			if (!!user) {
				User.validPassword(req.param('oldPassword'), user, function(err, valid) {
					if (err) return res.json(403, { err: 'Forbidden' });
					if (!valid)	return res.json(401, { err: 'Invalid Password' });
					delete req.allParams().oldPassword;
					User.update(user.id, req.allParams()).then(function() {
						getUsers().then(function(users) {
							res.json(users);
						}).catch(function(err) {
							res.json(err.status, { err: err });
						});
					}).catch(function(err) {
						res.json(err.status, { err: err });
					})
				});
			} else {
				return res.json(401, { err: 'Invalid credentials' });
			}
		}).catch(function(err) {
			res.json(err.status, { err: err });
		});
	},

	_config: { actions: false, shortcuts: false, rest: false }
};
