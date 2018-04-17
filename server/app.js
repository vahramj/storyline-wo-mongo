const express = require("express");
const cors = require("cors");

const data = require("./utils/data.js");

const app = express();

app.all("*", function _separateReqLog_(req,res,next){
	console.log("\n************************");
	console.log(req.method, req.url);
	next();
});

app.use(cors());

app.get("/data/allAssets", function _getAllAssets_(req, res){
	res.send(data);
})


app.use( express.static("./client") );

module.exports = app;