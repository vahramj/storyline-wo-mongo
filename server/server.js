// require('./config/config.js');
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 80;
console.log('NODE_ENV: ', process.env.NODE_ENV);
app.listen(port, () => {
	console.log(`server is now listening on port ${port}`);
});
console.log(process.env.DB_HOST);
