/**
 * *Title: common methods
 * ?description: common methods
 * @author: Faruk_sarkar
 * *Date: 14-September-2023
 */

function errorHandler(err, req, res, next) {
	res.json({
		message: 'this is error',
	});
}

function notFoundHandler(req, res, next) {
	res.json({
		message: 'not found',
	});
}

module.exports = {
	errorHandler,
	notFoundHandler,
};
