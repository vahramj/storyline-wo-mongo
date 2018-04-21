import axios from "axios";

import { actionTypes, ROOT_URL } from "../utils/constants";
import store from "../reducers/store";

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

export function persistAllAssets(newData){
	const { dispatch, getState } = store;
	let currData;
	if(!newData){
		currData = getState().assetsData.data
		console.log("currData: ", currData)
	}
	else {
		currData = newData;
	}
	// make api post request w data
	// console.log("persisting data: ", data);
	const request = axios.post(`${ROOT_URL}/assets/update`, currData);
	request
		.then( function _handleAllAssetsUpdateSuccess_(res) {
			console.log("persisited: ", res.data);
		})
		.catch( function _handleAllAssetsUpdateFailur_(err) {
			console.log("couldn't persist: ", err.response.data.message );
			const { oldData } = err.response.data;
			dispatch({
				type: SET_ASSETS,
				payload: oldData
			});
		});
	return {type: ""}
}

export function saveDetails(assetDetails){
	// console.log("assetDetails: ", assetDetails);
	return function _dispatcher_(dispatch){
		axios.post(`${ROOT_URL}/assets/save`, assetDetails)
			.then(function _handleSaveAssetSuccess_(res){
				const assetData = res.data;
				// console.log(assetData)
				dispatch({
					type: SAVE_ASSET_DETAILS,
					payload: assetData
				});
			})
			.catch(function _handleSaveAssetFailur_(err){
				console.log("couldn't save asset: ", err.response.data)
			})
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
