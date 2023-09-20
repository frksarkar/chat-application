// module import
const avatarUpload = require('../common/avatarConfig');

function getAvatar(req, res, next) {
	const upload = avatarUpload(
		'avatar',
		1024,
		['jpg', 'jpeg', 'png'],
		'only jpeg and png files are allowed'
	);

	upload.any()(req, res, (err) => {
		if (err) {
			return res.status(500).json({ error: err.massage });
		}
		next();
	});

	return upload.any();
}

module.exports = getAvatar;
