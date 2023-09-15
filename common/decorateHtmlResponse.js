function decorateHtmlResponse(pageTitle) {
	return function (req, res, next) {
		res.locals.title = pageTitle;
		next();
	};
}

module.exports = decorateHtmlResponse;
