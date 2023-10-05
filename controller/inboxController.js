const Conversation = require('../model/conversation');
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

module.exports = { getInbox, searchUser, addConversation };
