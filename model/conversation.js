const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema(
	{
		creator: {
			id: mongoose.Types.ObjectId,
			name: String,
			avatar: String,
		},
		participant: {
			id: mongoose.Types.ObjectId,
			name: String,
			avatar: String,
		},
		last_updated: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		timestamps: true,
	}
);

const conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = conversation;
