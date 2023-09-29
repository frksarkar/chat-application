// internal import
const jwt = require('jsonwebtoken');
const config = require('../../assets/configuration');

const checkLogin = function (req, res, next) {
	const cookie = req.signedCookies
		? req.signedCookies[config.cookieName]
		: null;
	try {
		if (cookie) {
			const decoded = jwt.verify(cookie, config.jwtSecretKey);
			if (res.locals.html) {
				res.locals.userInfo = decoded;
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
			res.redirect('inbox');
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { checkLogin, redirectLoggedIn };
