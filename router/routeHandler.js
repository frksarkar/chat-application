/**
 * *Title: route handlers
 * ?description: handler to handle all routes
 * @author: Faruk_sarkar
 * *Date: 14-September-2023
 */

// module exports
const express = require('express');
const loginHandler = require('./loginHandler');
const userHandler = require('./userHandler');
const inboxHandler = require('./inboxHandler');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');
const router = express.Router();

router.get('/', decorateHtmlResponse('login'), loginHandler);

router.get('/inbox', decorateHtmlResponse('inbox'), inboxHandler);

router.get('/users', decorateHtmlResponse('user'), userHandler);

module.exports = router;
