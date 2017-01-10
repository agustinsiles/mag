module.exports = {

	adminLogin: function(req, res) {
		var email = req.param('email'),
				password = req.param('password');
		if (!email || !password) return res.json(401, { err: 'Credentials required' });

		User.findOne({ email: email, isAdmin: true }).then(function(user) {
			if (!!user && !!user.isAdmin) {
				User.validPassword(password, user, function(err, valid) {
					if (err) return res.json(403, { err: 'Forbidden' });
					if (!valid)	return res.json(401, { err: 'Invalid credentials' });
					var userData = JSON.stringify({ id: user.id, email: user.email, permissions: user.permissions });
					userData = new Buffer(userData).toString('base64');
					return res.json({
						user: userData,
						access_token: jwtAuth.issueAdminAccessToken({ sid: user.id, permissions: user.permissions }),
						refresh_token: jwtAuth.issueAdminRefreshToken({ foo: user.id + new Date().getTime() })
					});
				});
			} else {
				return res.json(401, { err: 'Invalid credentials' });
			}
		}).catch(function(err) {
			res.json(err.status, { err: err });
		});
	},

	refreshOwnUser: function(req, res) {
		var email = req.param('email');
		if (!email) return res.json(401, { err: 'Credentials required' });

		User.findOne({ email: email, isAdmin: true }).then(function(user) {
			if (!!user && !!user.isAdmin) {
				var userData = JSON.stringify({ id: user.id, email: user.email, permissions: user.permissions });
				userData = new Buffer(userData).toString('base64');
				return res.json({	user: userData, access_token: jwtAuth.issueAdminAccessToken({ sid: user.id, permissions: user.permissions }) });
			} else {
				return res.json(401, { err: 'Invalid credentials' });
			}
		}).catch(function(err) {
			res.json(err.status, { err: err });
		});
	},

	isAuthenticated: function(req, res) {
		if (req.headers && req.headers.authorization) {
	    var token, parts = req.headers.authorization.split(' ');
	    if (parts.length !== 2) return res.json(401, { err: 'Error' });
	    if (parts.length === 2) {
	      var scheme = parts[0], credentials = parts[1];
	      if (/^Bearer$/i.test(scheme)) token = credentials;
	    }
	    jwtAuth.verifyAdminAccessToken(token, function(err, token) {
	      if (err) return res.json(401, { err: 'Error' });
	      return res.json({ isAuthenticated: true });
	    });
	  } else {
			return res.json({ isAuthenticated: false });
		}
	},

	refreshAccessToken: function(req, res) {
		var refresh_token = JSON.parse(JSON.parse(req.cookies.auth_token)).data.refresh_token || null,
				access_token = JSON.parse(JSON.parse(req.cookies.auth_token)).data.access_token || null;

		if (!!refresh_token && !!access_token) {
			jwtAuth.verifyAdminRefreshToken(refresh_token, function(err, token) {
		    if (err) return res.json(401, { isExpired: true, err: 'Error' });
				var payload = JSON.parse(new Buffer(access_token.split('.')[1], 'base64').toString());
				return res.json({ isExpired: false, access_token: jwtAuth.issueAdminAccessToken({ sid: payload.sid, permissions: payload.permissions }) });
		  });
		} else {
			return res.json(401, { isExpired: true, err: 'Error' });
		}
	},


	/*
	 *
	 * THIS IS FOR NORMAL SITE USERS ONLY
	 *
	 */

	publicLogin: function(req, res) {
		var email = req.param('email'),
				password = req.param('password');
		if (!email || !password) return res.json(401, { err: 'Credentials required' });

		User.findOne({ email: email, isAdmin: false }).then(function(user) {
			User.validPassword(password, user, function(err, valid) {
				if (err) return res.json(403, { err: 'Forbidden' });
				if (!valid)	return res.json(401, { err: 'Invalid credentials' });
				return res.json({ user: user.email,	token: jwtAuth.issuePublicAccessToken({ sid: user.id }) });
			});
		}).catch(function(err) {
			res.json(err.status, { err: err });
		});
	},

	signup: function(req, res) {
		req.body.isAdmin = false;
		User.create(req.body).then(function(user) {
			return res.json({ user: user.email, token: jwtAuth.issuePublicAccessToken({ sid: user.id }) });
		}).catch(function(err) {
			return res.json(err.status, { err: err });
		});
	},

	_config: { actions: false, shortcuts: false, rest: false }
};
