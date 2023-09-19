// module import
const avatar = require('../common/avatarConfig');

function getAvatar(req, res, next) {
	const upload = avatar(
		'avatar',
		1024,
		['jpg', 'jpeg', 'png'],
		'only jpeg and png files are allowed'
	);

	upload.any()(req, res, (err) => {
		if (err) {
			return res.status(500).json({ error: err.massage });
		}
		res.json({
			massage: {
				fileUploaded: 'file upload successfully',
			},
		});
		// next();
	});
}

module.exports = getAvatar;
