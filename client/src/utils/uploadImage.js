import sha1 from "sha1";
import superagent from "superagent";

// vahram, when all is working try this with axios
// vahram, when all is working try this w/ regular file loader
function uploadFile (file) {
	console.log(file);

	const image = file;

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

	const uploadRequest = superagent.post(url);
	uploadRequest.attach("file", image);

	Object.keys(params).forEach(key => {
		uploadRequest.field(key, params[key]);
	});

	uploadRequest.end((err, resp) => {
		if (err) {
			alert("err: ", err);
			return;
		}

		const uploaded = resp.body;
		console.log("upload complete: ", uploaded);

		// const images = Object.assign([], this.state.images);
		// images.push(uploaded);
		// this.setState({images});
	});
};

export default uploadFile;