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
const router = express.Router();

router.get('/', loginHandler);

router.get('/inbox', inboxHandler);

router.get('/users', userHandler);

module.exports = router;
