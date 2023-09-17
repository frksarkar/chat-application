// external module import
const express = require('express');

// external module import
const getLogin = require('../controller/loginController');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');

const router = express.Router();

router.get('/', decorateHtmlResponse('login'), getLogin);

module.exports = router;
