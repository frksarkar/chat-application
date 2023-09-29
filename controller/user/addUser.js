const bcrypt = require('bcrypt');
const User = require('../../model/userSchema');
const config = require('../../assets/configuration');

const addUser = async (req, res) => {
	const user = {
		...req.body,
		avatar: req.files[0] ? req.files[0].filename : null,
	};
	const bcryptPassword = await bcrypt.hash(user.password, config.saltRounds);
	user.password = bcryptPassword;
	const newUser = new User(user);
	await newUser.save();
	delete user.password;
	res.json({
		userInfo: user,
		massage: 'file upload successfully',
	});
};

module.exports = addUser;
