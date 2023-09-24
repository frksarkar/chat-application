const Users = require('../model/userSchema');
const { unlink } = require('fs');

async function getUser(req, res, next) {
	try {
		const users = await Users.find();
		res.render('users', { users });
	} catch (error) {
		next(error);
	}
}

// remove user
async function removeUser(req, res, next) {
	try {
		const user = await Users.findByIdAndDelete({ _id: req.params.id });
		if (user.avatar) {
			const dirLink = `${__dirname}/../public/avatar/${user.avatar}`;
			unlink(dirLink, (err) => {
				if (err) {
					throw err;
				}
			});
		}
		res.status(200).json({
			message: 'user was removed successfully',
		});
	} catch (error) {
		res.status(500).json({
			error: {
				common: 'Could not remove user!',
			},
		});
	}
}

module.exports = { getUser, removeUser };
