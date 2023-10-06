const Conversation = require('../model/conversation');
const Message = require('../model/messages');
const users = require('../model/userSchema');
const escape = require('../utility/escape');
const moment = require('moment');

async function getInbox(req, res) {
	const data = await Conversation.find({
		$or: [
			{ 'creator.id': req.user.userId },
			{ 'participant.id': req.user.userId },
		],
	});
	res.locals.data = data;
	res.locals.moment = moment;
	res.render('inbox');
}

async function searchUser(req, res) {
	const searchValue = req.body.user;
	const withOutCountyCodes = searchValue.replace('+88', '');

	const nameSearchRegex = new RegExp('^' + escape(withOutCountyCodes), 'i');
	const emailSearchRegex = new RegExp(
		'^' + escape(withOutCountyCodes) + '$',
		'i'
	);
	const mobileSearchRegex = new RegExp(
		'^' + escape('+88' + withOutCountyCodes)
	);
	const user = await users.find({
		$or: [
			{
				name: nameSearchRegex,
			},
			{
				email: emailSearchRegex,
			},
			{
				mobile: mobileSearchRegex,
			},
		],
	});
	res.json(user);
}

async function addConversation(req, res) {
	try {
		const conversation = {
			creator: {
				id: req.user.userId,
				name: req.user.username,
				avatar: req.user.avatar,
			},
			participant: {
				id: req.body.id,
				name: req.body.participant,
				avatar: req.body.avatar,
			},
		};
		const createConversation = new Conversation(conversation);
		await createConversation.save();
		res.json({ mes: 'Successfully created conversion' });
	} catch (error) {
		res.json({
			error: {
				common: error,
			},
		});
	}
}

async function getMessage(req, res) {
	try {
		const messages = await Message.find({
			conversation_id: req.params.conversation_id,
		}).sort('-createdAt');

		const { participant } = await Conversation.findById(
			req.params.conversation_id
		);

		res.json({
			data: {
				messages,
				participant,
			},
			user: req.user.userId,
			conversation_id: req.params.conversation_id,
		});
	} catch (error) {
		res.json({
			error: {
				common: {
					msg: error,
				},
			},
		});
	}
}

async function sendMessages(req, res) {
	if (req.body.message || (req.files && req.files.length > 0)) {
		let attachments = null;

		if (req.files && req.files.length > 0) {
			attachments = [];
			req.files.forEach((file) => {
				attachments.push(file.filename);
			});
		}
		const newMessage = new Message({
			text: req.body.message,
			attachment: attachments,
			sender: {
				id: req.user.userId,
				name: req.user.username,
				avatar: req.user.avatar,
			},
			receiver: {
				id: req.body.receiverId,
				name: req.body.receiverName,
				avatar: req.body.avatar,
			},
			conversation_id: req.body.conversationId,
		});

		console.log(newMessage);
		const result = await newMessage.save();

		// emit socket event
		global.io.emit('new_message', result);

		res.status(200).json({
			message: 'Successful!',
		});
	}
}

module.exports = {
	getInbox,
	searchUser,
	addConversation,
	getMessage,
	sendMessages,
};
