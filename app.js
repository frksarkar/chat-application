/**
 * *Title: Chat-Application
 * ?description: main file as s chat application
 * @author: Faruk_sarkar
 * *Date: 12-September-2023
 */

// module
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const loginHandler = require('./router/loginHandler');
const userHandler = require('./router/userHandler');
const inboxHandler = require('./router/inboxHandler');
const { errorHandler, notFoundHandler } = require('./middleware/common/common');
const env = require('./assets/configuration');
const cookieParser = require('cookie-parser');
const config = require('./assets/configuration');
const app = express();
const http = require('http');
const server = http.createServer(app);

// socket connection
const io = require('socket.io')(server);
global.io = io;

app.use(express.json()); // for parsing json data from request
app.use(express.urlencoded({ extended: true })); // urlencoded request parameters
app.use(cookieParser(config.cookieSecretKey));
app.set('view engine', 'ejs'); // set EJS template engine
app.use(express.static(path.join(__dirname, 'public'))); // static directory

// connect to the database
mongoose
	.connect(env.dbUri)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => console.log(err));

// router export and used
app.use('/', loginHandler);

app.use('/inbox', inboxHandler);

app.use('/users', userHandler);

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
