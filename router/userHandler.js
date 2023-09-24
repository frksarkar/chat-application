// external module imports
const express = require('express');

// internal module imports
const { getUser, removeUser } = require('../controller/usersController');
// const config = require('../assets/configuration');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');
const getAvatar = require('../controller/avatarController');
const {
	validationField,
	userValidation,
} = require('../common/validationField');
const addUser = require('../controller/user/addUser');
const router = express.Router();

router.get('/', decorateHtmlResponse('User'), getUser);

router.post('/', getAvatar, validationField, userValidation, addUser);

router.delete('/:id', removeUser);

module.exports = router;
