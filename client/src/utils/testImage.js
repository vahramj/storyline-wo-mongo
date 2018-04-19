function testImageUrl(imageUrl, timeoutT = 5000){
	const img = new Image();

	return new Promise( function _promiseExecutor_(resolve, reject){
		const timeoutRef = setTimeout(function _handleTimeout_(){
			img.src = "//!!!!/test.jpg";
			reject(Error("timeout"));
		}, timeoutT);
		img.onerror = function _handleImageLoadError_(){
			reject(Error("error"));
			clearTimeout(timeoutRef);
		}
		img.onload = function _handleImageLoadSuccess_(){
			resolve("success")
			clearTimeout(timeoutRef);
		}
		img.src = imageUrl;
	});
}

export default testImageUrl;