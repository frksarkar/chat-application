/**
 * *Title: common methods
 * ?description: common methods
 * @author: Faruk_sarkar
 * *Date: 14-September-2023
 */

function notFoundHandler(req, res, next) {
	res.json({ message: 'page not found' });
}

function errorHandler(err, req, res, next) {
	// console.loo('error name:', err.name);
	// console.loo('error message:', err.message);
	// console.loo('error stack', err.stack);
	// console.loo('error status code:', err.statusCode);

	res.json({
		message: err.message,
	});
}

module.exports = {
	errorHandler,
	notFoundHandler,
};
