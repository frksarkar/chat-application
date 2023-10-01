function decorateHtmlResponse(pageTitle) {
	return function (req, res, next) {
		res.locals.html = true;
		res.locals.title = pageTitle;
		res.locals.loggedInUser = {};
		res.locals.data = [];
		res.locals.errors = {};
		next();
	};
}

module.exports = decorateHtmlResponse;
