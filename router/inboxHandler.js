// external module import
const express = require('express');

// internal module import
const getInbox = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const { checkLogin } = require('../middleware/login/checkLogin');
const router = express.Router();

// index page
router.get('/', decorateHtmlResponse('inbox'), checkLogin, getInbox);

module.exports = router;
