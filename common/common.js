/**
 * *Title: common methods
 * ?description: common methods
 * @author: Faruk_sarkar
 * *Date: 14-September-2023
 */

// module
const env = require('../assets/configuration');

function notFoundHandler(req, res, next) {
	res.locals.title = 'page not found';
	res.render('error');
}

function errorHandler(err, req, res, next) {
	res.render('error');
}

module.exports = {
	errorHandler,
	notFoundHandler,
};
