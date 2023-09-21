// external module imports
const express = require('express');

// internal module imports
const getUser = require('../controller/usersController');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');
const getAvatar = require('../controller/avatarController');
const {
	validationField,
	userValidation,
} = require('../common/validationField');
const router = express.Router();

router.get('/', decorateHtmlResponse('User'), getUser);

router.post('/', getAvatar, validationField, userValidation, (req, res) => {
	// console.log(req.body);
	res.json({
		massage: {
			fileUploaded: 'file upload successfully',
		},
	});
});

module.exports = router;
