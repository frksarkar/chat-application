const avatarUpload = require('../common/avatarConfig');

function attachmentUpload(req, res, next) {
	const upload = avatarUpload(
		'attachments',
		1024,
		['jpg', 'jpeg', 'png'],
		'Only jpg, png and jpeg files are allowed'
	);
	upload.any()(req, res, (err) => {
		if (err) {
			res.status(500).json({
				error: {
					avatar: {
						msg: err.message,
					},
				},
			});
		} else {
			next();
		}
	});
}

module.exports = attachmentUpload;
