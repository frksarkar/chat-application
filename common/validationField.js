const { check, validationResult } = require('express-validator');
const fs = require('fs');
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
			throw createError('email address already exists');
		}),
	check('mobile')
		.isMobilePhone('bn-BD', { strictMode: true })
		.withMessage('phone number is not valid'),
	check('password')
		.isStrongPassword()
		.withMessage(
			'password at last 1 uppercase 1 lowercase  1 special characters 1 and 1 digit'
		),
];

const userValidation = (req, res, next) => {
	const result = validationResult(req);
	const err = result.mapped();
	const errorListLength = Object.values(err).length;

	if (errorListLength === 0) {
		next();
	} else {
		if (req.files.length > 0) {
			const path = req.files[0].path;
			fs.unlink(path, function (err) {
				if (!err) {
					return console.log('file removed successfully');
				}
				console.log(err);
			});
		}
		res.status(500).json({ error: err });
	}
};

module.exports = { validationField, userValidation };
