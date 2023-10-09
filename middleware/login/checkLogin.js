// internal import
const jwt = require('jsonwebtoken');
const config = require('../../assets/configuration');
const createHttpError = require('http-errors');

const checkLogin = function (req, res, next) {
	const cookie = req.signedCookies
		? req.signedCookies[config.cookieName]
		: null;

	try {
		if (cookie) {
			const decoded = jwt.verify(cookie, config.jwtSecretKey);
			req.user = decoded;

			if (res.locals.html) {
				res.locals.loggedInUser = decoded;
			}
			next();
		} else {
			res.redirect('/');
		}
	} catch (error) {
		console.log(error);
	}
};

const redirectLoggedIn = function (req, res, next) {
	const cookie = req.signedCookies
		? req.signedCookies[config.cookieName]
		: null;
	try {
		if (!cookie) {
			next();
		} else {
			res.redirect('/inbox');
		}
	} catch (error) {
		console.log(error);
	}
};

const requireRole = function (role) {
	return function (req, res, next) {
		if (req.user.role && role.includes(req.user.role)) {
			next();
		} else {
			if (res.locals.html) {
				next(
					createHttpError(
						401,
						'you are not authorized to access this page.'
					)
				);
			} else {
				res.status(401).json({
					error: {
						common: {
							msg: 'You are not authorized to access this page',
						},
					},
				});
			}
		}
	};
};

module.exports = { checkLogin, redirectLoggedIn, requireRole };
