// external module imports
const express = require('express');

// internal module imports
const getUser = require('../controller/usersController');
// const config = require('../assets/configuration');
const decorateHtmlResponse = require('../common/decorateHtmlResponse');
const bcrypt = require('bcrypt');
const getAvatar = require('../controller/avatarController');
const {
	validationField,
	userValidation,
} = require('../common/validationField');
const User = require('../model/userSchema');
const router = express.Router();

router.get('/', decorateHtmlResponse('User'), getUser);

router.post(
	'/',
	getAvatar,
	validationField,
	userValidation,
	async (req, res) => {
		const user = { ...req.body };
		const bcryptPassword = await bcrypt.hash(user.password, 10);
		user.password = bcryptPassword;
		const newUser = new User({ ...user, avatar: req.files.filename });
		console.log(newUser);
		const userInfo = await newUser.save();
		res.json({
			massage: {
				userInformation: userInfo,
				fileUploaded: 'file upload successfully',
			},
		});
	}
);

module.exports = router;
