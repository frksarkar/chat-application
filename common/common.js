/**
 * *Title: common methods
 * ?description: common methods
 * @author: Faruk_sarkar
 * *Date: 14-September-2023
 */

// module
const config = require('../assets/configuration');

function notFoundHandler(req, res, next) {
	res.locals.error = {};
	res.locals.title = 'page not found';
	res.render('error');
	// res.json({ error: 'page not found' });
}

function errorHandler(err, req, res, next) {
	res.locals.error = config.server === 'development' ? err : err.message;

	res.status(err.status || 500);
	if (config.server === 'production') {
		res.json(err.message);
	} else {
		res.render('error', { title: 'error message' });
	}
}

module.exports = {
	errorHandler,
	notFoundHandler,
};
