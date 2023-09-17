// external module import
const express = require('express');

// internal module import
const getInbox = require('../controller/inboxController');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');
const router = express.Router();

// index page
router.get('/', decorateHtmlResponse('inbox'), getInbox);

module.exports = router;
