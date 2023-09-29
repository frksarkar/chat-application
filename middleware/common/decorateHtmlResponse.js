function decorateHtmlResponse(pageTitle) {
	return function (req, res, next) {
		res.locals.html = true;
		res.locals.title = pageTitle;
		res.locals.userInfo = {};
		res.locals.error = {};
		next();
	};
}

module.exports = decorateHtmlResponse;
