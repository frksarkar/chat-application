const bcrypt = require('bcrypt');
const User = require('../../model/userSchema');
const config = require('../../assets/configuration');

const addUser = async (req, res) => {
	const user = { ...req.body };
	const bcryptPassword = await bcrypt.hash(user.password, config.saltRounds);
	user.password = bcryptPassword;
	const newUser = new User({ ...user, avatar: req.files.filename });
	console.log(newUser);
	const userInfo = await newUser.save();
	res.json({
		userInfo: userInfo,
		massage: 'file upload successfully',
	});
};

module.exports = addUser;
