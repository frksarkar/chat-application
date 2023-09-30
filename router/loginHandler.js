// external module import
const express = require('express');

// external module import
const { getLogin, login, logout } = require('../controller/loginController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const {
	validationCheck,
	fieldValidations,
} = require('../middleware/login/loginFieldValidation');
const { redirectLoggedIn } = require('../middleware/login/checkLogin');

const router = express.Router();

router.get('/', decorateHtmlResponse('login'), redirectLoggedIn, getLogin);

router.post(
	'/',
	decorateHtmlResponse('login'),
	fieldValidations,
	validationCheck,
	login
);

router.delete('/', logout);

module.exports = router;
