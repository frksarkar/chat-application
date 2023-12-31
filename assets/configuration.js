/**
 * *Title: configuration file
 * ?description: configuration properties for the application component
 * @author: Faruk_sarkar
 * *Date: 13-September-2023
 */

// module exports
require('dotenv').config();

// application scaffolding configuration
const isProduction = process.env.NODE_ENV === 'production';

const config = {
	dbUri: isProduction ? 'localhost' : process.env.DB_HOST,
	server: isProduction ? process.env.NODE_ENV : 'development',
	port: isProduction ? 5000 : process.env.SERVER_PORT,
	saltRounds: Number(process.env.SALT_ROUNDS),
	jwtSecretKey: process.env.JWT_SECRET_KEY,
	jwtExpireSecond: process.env.JWT_EXPIRE_SECONDS,
	cookieName: process.env.COOKIE_NAME,
	cookieSecretKey: process.env.COOKIE_SECRET_KEY,
	appUrl: process.env.APP_URL,
};

// export this scaffold
module.exports = config;
