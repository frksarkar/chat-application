const createError = require('http-errors');
const User = require('../model/userSchema');
const config = require('../assets/configuration');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function getLogin(req, res) {
	res.locals.username = req.body.username || '';
	res.render('index');
}

// do login
async function login(req, res, next) {
	try {
		const user = await User.findOne({
			$or: [{ email: req.body.username }, { mobile: req.body.username }],
		});

		if (user && user.name) {
			const isValidPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (isValidPassword) {
				const payload = {
					name: user.name,
					email: user.email,
					mobile: user.mobile,
					role: user.role,
				};

				// jwt token
				const token = jwt.sign(payload, config.jwtSecretKey, {
					expiresIn: config.jwtExpireSecond,
				});

				// store the cookie
				res.cookie(config.cookieName, token, {
					maxAge: config.jwtExpireSecond,
					signed: true,
					httpOnly: true,
				});

				res.locals.userInfo = payload;

				res.render('inbox');
			} else {
				throw createError('user not found');
			}
		} else {
			throw createError('user not found');
		}
	} catch (error) {
		res.render('index', {
			error: {
				common: {
					message: error.message,
				},
			},
		});
	}
}

function logout(req, res, next) {
	res.clearCookie(config.cookieName);
	res.send('Cookie deleted');
}

module.exports = { getLogin, login, logout };
