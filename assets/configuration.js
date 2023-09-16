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

const app = {
	dbUri: isProduction ? 'localhost' : process.env.DB_HOST,
	server: isProduction ? process.env.NODE_ENV : 'development',
	port: isProduction ? 5000 : process.env.SERVER_PORT,
};

// export this scaffold
module.exports = app;
