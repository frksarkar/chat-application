// external module imports
const express = require('express');

// internal module imports
const getUser = require('../controller/usersController');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');
const getAvatar = require('../controller/avatarController');

const router = express.Router();

router.get('/', decorateHtmlResponse('User'), getUser);

router.post('/', getAvatar);

module.exports = router;
