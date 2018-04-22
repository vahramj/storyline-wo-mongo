import axios from "axios";

async function uploadFile (imageFile) {
	// console.log("file: ", imageFile);

	const cloudName = "cldimgs";
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

	const timestamp = Date.now() / 1000;
	const uploadPreset = "affevzry";
	const apiKey = "295886862954169";

	const formData = new FormData();
	formData.append("file", imageFile);
	formData.append("upload_preset", uploadPreset);
	formData.append("api_key", apiKey);
	formData.append("timestamp", timestamp);

	// **** with axios
	try {
		const reqResult = await axios.post(url, formData);
		return reqResult.data.secure_url;
	}
	catch(err){
		console.log(err);
		return null;
	}
};

export default uploadFile;