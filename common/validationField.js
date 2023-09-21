const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../model/userSchema');

const validationField = [
	check('name')
		.trim()
		.isLength({ min: 3 })
		.withMessage('name at last 3 character long')
		.notEmpty(),
	check('email')
		.isEmail()
		.withMessage('Invalid email address')
		.toLowerCase()
		.custom(async (value) => {
			const user = await User.findOne({ email: value });
			if (!user) {
				return true;
			}
			console.log(user);
			throw createError('email address already exists');
		}),
	check('mobile')
		.isMobilePhone('bn-BD')
		.withMessage('phone number is not valid'),
	check('password')
		.isStrongPassword()
		.withMessage(
			'password at last 1 uppercase 1 lowercase  1 special characters 1 and 1 digit'
		),
];

const userValidation = (req, res, next) => {
	const result = validationResult(req);
	const err = result.formatWith((error) => error.msg);
	if (err.length != 0) {
		next();
	}
};

module.exports = { validationField, userValidation };
