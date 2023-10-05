// external module import
const express = require('express');

// internal module import
const {
	getInbox,
	searchUser,
	addConversation,
} = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const { checkLogin } = require('../middleware/login/checkLogin');
const router = express.Router();

// index page
router.get('/', decorateHtmlResponse('inbox'), checkLogin, getInbox);

router.post('/search', checkLogin, searchUser);

router.post('/conversation', checkLogin, addConversation);

module.exports = router;
