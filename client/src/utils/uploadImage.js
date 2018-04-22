import sha1 from "sha1";
import request from "superagent";
import axios from "axios";

// vahram, when all is working try this with axios
// vahram, when all is working try this w/ regular file loader
async function uploadFile (imageFile) {

	const cloudName = "cldimgs";
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

	const timestamp = Date.now() / 1000;
	const uploadPreset = "affevzry";
	const secret = "1IA49RibTzlQ-NmpNFt9i7LYVz0";

	const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${secret}`;
	const signature = sha1(paramsStr);
	console.log("paramsStr: ", paramsStr);
	console.log("signature: ", signature);

	const params = {
		timestamp,
		signature,
		api_key: "295886862954169",
		upload_preset: uploadPreset
	};

	const uploadProm = request
		.post(url)
		.attach("file", imageFile);

	Object.keys(params).forEach(key => {
		uploadProm.field(key, params[key]);
	});

	const reqResult = await uploadProm;

	return reqResult.body.secure_url;

	// console.log("file: ", imageFile);

	// const cloudName = "cldimgs";
	// const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

	// const timestamp = Date.now() / 1000;
	// const uploadPreset = "affevzry";
	// const secret = "1IA49RibTzlQ-NmpNFt9i7LYVz0";

	// const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${secret}`;
	// const signature = sha1(paramsStr);
	// console.log("paramsStr: ", paramsStr);
	// console.log("signature: ", signature);

	// const config = {
	// 	timestamp,
	// 	signature,
	// 	api_key: "295886862954169",
	// 	upload_preset: uploadPreset,
	// 	method: "POST",
	// 	data: {file: imageFile},
	// 	url
	// };

	// try {
	// 	const reqResult = await axios(config);
	// 	return reqResult.body.secure_url;
	// }
	// catch(err){
	// 	console.log(err);
	// 	return null;
	// }

};

export default uploadFile;