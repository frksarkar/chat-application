/**
 * *Title: avatar image
 * ?description: avatar image configuration and store the DB
 * @author: Faruk_sarkar
 * *Date: 19-September-2023
 */

// external module imports
const multer = require('multer');
const createError = require('http-errors');

function avatarUpload(directory, maxSize, fileFormat, massage) {
	const dirLink = `${__dirname}/../public/${directory}`;

	const storage = multer.diskStorage({
		destination: (req, file, callback) => {
			console.log(dirLink);
			callback(null, dirLink);
		},
		filename: (req, file, callback) => {
			const fileName = Date.now() + '-' + file.originalname;
			callback(null, fileName);
		},
	});

	const upload = multer({
		storage: storage,
		maxSize: maxSize,
		fileFilter: (req, file, callback) => {
			const regex = /[^\/]+(?=\w*)$/;
			const mineType = fileFormat.includes(file.mimetype.match(regex)[0]);

			if (mineType) {
				callback(null, true);
			} else {
				callback(createError(massage));
			}
		},
	});

	return upload;
}

module.exports = avatarUpload;
