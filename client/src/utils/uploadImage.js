import axios from "axios";

async function uploadFile (imageFile) {
	// console.log("file: ", imageFile);

	const cloudName = "cldimgs";
	const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

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
		const config = {
			onUploadProgress(eventProgress){
				console.log( "progress: ", Math.round(eventProgress.loaded/eventProgress.total* 100) )
			}
		};

		const reqResult = await axios.post(uploadUrl, formData, config);
		const { secure_url: imageUrl, public_id: imageId } = reqResult.data;
		return {
			imageUrl,
			imageId
		};
	}
	catch(err){
		console.log(err);
		return null;
	}
};

export default uploadFile;