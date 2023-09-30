const { check, validationResult } = require('express-validator');

const fieldValidations = [
	check('username')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters long'),

	check('password')
		.isStrongPassword()
		.withMessage('password must be at least 8 characters long'),
];

const validationCheck = function (req, res, next) {
	res.locals.username = req.body.username;
	const result = validationResult(req);
	const error = result.mapped();
	if (Object.keys(error).length === 0) {
		//
		next();
	} else {
		res.render('index', {
			error: error,
		});
	}
};

module.exports = {
	fieldValidations,
	validationCheck,
};
