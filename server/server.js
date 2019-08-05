// require('./config/config.js');
const app = require('./app');

const port = process.env.PORT || 1234;
console.log('NODE_ENV: ', process.env.NODE_ENV);
app.listen(port, () => {
	console.log(`server is now listening on port ${port}`);
});
