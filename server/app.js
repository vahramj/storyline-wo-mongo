const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const makeUniqId = require('uniqid');
const cloudinary = require('cloudinary');

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
	require('./config/config.js');
}

let data = require('./utils/data.js');

cloudinary.config({
	cloud_name: 'cldimgs',
	api_key: process.env.cloudinaryKey,
	api_secret: process.env.cloudinarySecret,
});

const app = express();

app.all('*', function _separateReqLog_(req, res, next) {
	console.log('\n************************');
	console.log(req.method, req.url);
	next();
});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./client'));

app.get('/assets', function _getAllAssets_(req, res) {
	res.send(data);
});

app.post('/assets/update', function _updateAllAssets_(req, res) {
	// console.log(req.body);
	if (req.body) {
		data = req.body;
		res.send('update received');
	} else {
		res.status(500).send({
			oldData: data,
			message: "server didn't like your new data.",
		});
	}

	// res.status(500).send( "not going to accept this update" );
});

app.post('/assets/save', function _saveAsset_(req, res) {
	// console.log(req.body)
	let assetData = req.body;
	let { id } = assetData;

	if (id && id in data) {
		const { imageData: oldImageData } = data[id];
		if (
			oldImageData &&
			oldImageData.imageId &&
			assetData.imageData &&
			(!assetData.imageData.imageId ||
				assetData.imageData.imageId !== oldImageData.imageId)
		) {
			const { imageId: oldImageId } = oldImageData;
			// delete image from cloudinary
			cloudinary.v2.uploader.destroy(oldImageId, function _afterImageDeleted_(
				err,
				result,
			) {
				if (err) {
					console.log(err);
					return;
				}
				console.log('deleted image from cloudinary: ', result);
			});
		}
		assetData = {
			...data[id],
			...assetData,
		};
	} else if (!id) {
		id = makeUniqId();
		assetData = {
			...assetData,
			id,
			parent: null,
			children: [],
		};
	}
	// console.log(data);
	data[id] = assetData;
	// console.log(data);

	res.send(assetData);
});

app.delete('/assets/delete', function _deleteAsset_(req, res) {
	const { id } = req.body;
	if (!(id in data)) {
		res.status(404).send('id was not found');
		return;
	}

	const asset = data[id];
	const affectedAssets = {};
	if (asset.parent) {
		const parent = data[asset.parent.id];
		parent.children = parent.children.filter(child => {
			return child.id !== id;
		});
		affectedAssets[parent.id] = parent;
	}
	if (asset.children) {
		asset.children.forEach(childRef => {
			data[childRef.id].parent = null;
			affectedAssets[childRef.id] = data[childRef.id];
		});
	}
	if (asset.imageData && asset.imageData.imageId) {
		const { imageId } = asset.imageData;
		cloudinary.v2.uploader.destroy(imageId, function _afterImageDeleted_(
			err,
			result,
		) {
			if (err) {
				console.log(err);
				return;
			}
			console.log('deleted image from cloudinary: ', result);
		});
	}
	delete data[id];
	// console.log(affectedAssets)
	res.send({
		id,
		affectedAssets,
	});
});

module.exports = app;
