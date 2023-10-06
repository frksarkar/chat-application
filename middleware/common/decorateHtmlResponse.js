const config = require('../../assets/configuration');

function decorateHtmlResponse(pageTitle) {
	return function (req, res, next) {
		res.locals.appUrl = config.appUrl;
		res.locals.html = true;
		res.locals.title = pageTitle;
		res.locals.loggedInUser = {};
		res.locals.data = [];
		res.locals.errors = {};
		next();
	};
}

module.exports = decorateHtmlResponse;
