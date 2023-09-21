/**
 * *Title: user schema
 * ?description: User Schema
 * @author: Faruk_sarkar
 * *Date: 21-September-2023
 */
// module import
const mongoose = require('mongoose');

// Create Schema Object
const userSchema = mongoose.Schema({
	name: {
		type: 'String',
		require: true,
	},
	email: {
		type: 'String',
		require: true,
	},
	mobile: {
		type: 'String',
		require: true,
	},
	password: {
		type: 'String',
		require: true,
	},
});

// Create a Mongoose model

const User = mongoose.model('User', userSchema);

// export
module.exports = User;
