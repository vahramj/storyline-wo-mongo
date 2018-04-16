require("./config/config.js");
const app = require("./app");

const port = process.env.PORT;

app.listen(port, ()=>{
	console.log(`server is now listening on port ${port}`)
});