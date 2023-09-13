/**
 * *Title: Chat-Application
 * ?description: main file as s chat application
 * @author: Faruk_sarkar
 * *Date: 12-September-2023
 */

// module
const mongoose = require('mongoose');
const express = require('express');
const { errorHandler, notFoundHandler } = require('./common/common');
// const notFoundHandler = require('notFoundHandler');
// const errorHandler = require('errorHandler');
require('dotenv').config();
const env = require('./assets/configuration');

// app
const app = express();
app.use(express.json()); // for parsing json data from request
app.use(express.urlencoded({ extended: true })); // urlencoded request parameters

// connect to the database
mongoose
	.connect(env.dbUri)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => console.log(err));

// router export and used

// 404 not found route
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// server
app.listen(env.port, function (error) {
	if (error) {
		console.log('error listening server');
	} else {
		console.log('listening on port ' + env.port);
	}
});
