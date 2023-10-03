const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema(
	{
		creator: {
			id: mongoose.Types.ObjectId,
			name: String,
			avatar: String,
		},
		participate: {
			id: mongoose.Types.ObjectId,
			name: String,
			avatar: String,
		},
		last_time: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		timestamp: true,
	}
);

const conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = conversation;
