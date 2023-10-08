// external module import
const express = require('express');

// internal module import
const {
	getInbox,
	searchUser,
	addConversation,
	getMessage,
	sendMessages,
	deleteConversation,
	search,
} = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const { checkLogin } = require('../middleware/login/checkLogin');
const router = express.Router();
const attachmentUpload = require('../middleware/inbox/attachmentUpload');

// index page
router.get('/', decorateHtmlResponse('inbox'), checkLogin, getInbox);

router.post('/search', checkLogin, searchUser);

router.post('/conversation', checkLogin, addConversation);

router.get('/messages/:conversation_id', checkLogin, getMessage);

router.post('/message', checkLogin, attachmentUpload, sendMessages);

router.delete('/conversation/:conversation_id', checkLogin, deleteConversation);

router.post('/user/search', checkLogin, search);

module.exports = router;
