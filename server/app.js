const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

let data = require("./utils/data.js");

const app = express();

app.all("*", function _separateReqLog_(req,res,next){
	console.log("\n************************");
	console.log(req.method, req.url);
	next();
});

app.use(cors());
app.use(bodyParser.json());

app.get("/data/allAssets", function _getAllAssets_(req, res){
	res.send(data);
});

app.post("/data/update", function _updateData_(req, res){
	// console.log(req.body);
	res.send("update received");

	data = req.body;
	// res.status(500).send( "not going to accept this update" );
});


app.use( express.static("./client") );

module.exports = app;