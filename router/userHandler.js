// external module imports
const express = require('express');

// internal module imports
const getUser = require('../controller/usersController');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');

const router = express.Router();

router.get('/', decorateHtmlResponse('User'), getUser);

module.exports = router;
