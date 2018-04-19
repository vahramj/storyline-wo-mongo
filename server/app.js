const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const makeUniqId = require("uniqid");


let data = require("./utils/data.js");

const app = express();

app.all("*", function _separateReqLog_(req,res,next){
	console.log("\n************************");
	console.log(req.method, req.url);
	next();
});

app.use(cors());
app.use(bodyParser.json());

app.get("/assets", function _getAllAssets_(req, res){
	res.send(data);
});

app.post("/assets/update", function _updateAllAssets_(req, res){
	// console.log(req.body);
	res.send("update received");

	data = req.body;
	// res.status(500).send( "not going to accept this update" );
});

app.post("/assets/save", function _saveAsset_(req, res){
	// console.log(req.body)
	let assetData = req.body;
	let { id } = assetData;
			
	if(id && id in data){
		assetData = {
			...data[id],
			...assetData
		}
	}
	else {
		id = makeUniqId()
		assetData = {
			...assetData,
			id,
			parent: null,
			children: [],
		}
	}
	console.log(data)
	data[id] = assetData;
	console.log(data)
	
	res.send(assetData);
})

app.use( express.static("./client") );

module.exports = app;