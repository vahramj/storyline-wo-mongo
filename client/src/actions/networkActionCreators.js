import axios from "axios";

import { actionTypes, ROOT_URL } from "../utils/constants";
import uploadImage from "../utils/uploadImage";

const {
	SET_ASSETS, 
	SAVE_ASSET_DETAILS,
	DELETE_ASSET,
} = actionTypes;

export function fetchAssetsData(){
	// console.log("fetching assetsData: ")
	const request = axios.get(`${ROOT_URL}/assets`);

	return function _dispatcher_(dispatch){
		request
			.then( function _dispatchAssetsData_(res){
				dispatch ({
					type: SET_ASSETS,
					payload: res.data
				});
			})
			.catch( function _handleFetchFailur_(err){
				console.log("problem while fetching data: ", err)
			})
	}
}

export function persistAllAssets(){
	return function _dispatcher_(dispatch, getState){
		const newData = getState().assetsData.data
		// console.log("newData: ", newData)
		// console.log("persisting data: ", newData);
		const request = axios.post(`${ROOT_URL}/assets/update`, newData);
		request
			.then( function _handleAllAssetsUpdateSuccess_(res) {
				// console.log("persisited: ", newData);
			})
			.catch( function _handleAllAssetsUpdateFailur_(err) {
				console.log("couldn't persist: ", err.response.data.message );
				const { oldData } = err.response.data;
				dispatch({
					type: SET_ASSETS,
					payload: oldData
				});
			});
	}
}

export function saveDetails(assetDetails){
	console.log("assetDetails: ", assetDetails);
	// persist the file to cloudinary then use the returned url
	return async function _dispatcher_(dispatch){
		// let promChain = Promise.resolve();

		// if(assetDetails.imageData && assetDetails.imageData.imageFile){
		// 	promChain = uploadImage(assetDetails.imageData.imageFile)
		// }

		// promChain
		// 	.then(function _sendSaveRequest_(url){
		// 		const updatedAssetDetails = Object.assign({}, assetDetails);
		// 		if(url){
		// 			updatedAssetDetails.imageData.imageUrl = url;
		// 			delete updatedAssetDetails.imageData.imageFile
		// 			// console.log("updatedAssetDetails: ", updatedAssetDetails);
		// 		}
		// 		return axios.post(`${ROOT_URL}/assets/save`, updatedAssetDetails)
		// 	})
		// 	.then(function _handleSaveAssetSuccess_(res){
		// 		const assetData = res.data;
		// 		// console.log(assetData)
		// 		dispatch({
		// 			type: SAVE_ASSET_DETAILS,
		// 			payload: assetData
		// 		});
		// 	})
		// 	.catch(function _handleSaveAssetFailur_(err){
		// 		console.log("couldn't save asset: ", err.response.data)
		// 	})

		try {
			const updatedAssetDetails = Object.assign({}, assetDetails);

			if(assetDetails.imageData && assetDetails.imageData.imageFile){

				const url = await uploadImage(assetDetails.imageData.imageFile);

				if(url){
					updatedAssetDetails.imageData.imageUrl = url;
					delete updatedAssetDetails.imageData.imageFile;
				}
				else {
					updatedAssetDetails.imageData = null; 
				}
				// console.log("updatedAssetDetails: ", updatedAssetDetails);
			}

			const res = await axios.post(`${ROOT_URL}/assets/save`, updatedAssetDetails);
			
			const assetData = res.data;
			// console.log(assetData)
			dispatch({
				type: SAVE_ASSET_DETAILS,
				payload: assetData
			});
		}
		catch(err){
			console.log("couldn't save asset: ", err.response.data)
		}
	}
}

export function deleteAsset(assetId){
	// console.log(`deleting asset ${assetId}`);
	return function _dispatcher_(dispatch){
		// axios.delete(`${ROOT_URL}/assets/delete`, {body: {assetId}})
		axios({
			method: "delete",
			url: `${ROOT_URL}/assets/delete`, 
			data: {id: assetId}
		})
			.then(function _handleDeleteAssetSuccess_(res){
				// console.log("deleted asset: ", res.data);
				dispatch({
					type: DELETE_ASSET,
					payload: res.data
				});
			})
			.catch(function _handleDeleteAssetFail_(err){
				console.log("server had a problem with deleting the file: ", err.response.data)
			})
	}
}
