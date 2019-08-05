const configs = require('./config.json');

// console.log(configs);

const env = process.env.NODE_ENV || 'developement';

if (env === 'test' || env === 'developement') {
	Object.keys(configs[env]).forEach(key => {
		process.env[key] = configs[env][key];
	});
}
