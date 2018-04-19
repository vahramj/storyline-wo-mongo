import axios from "axios";

import { actionTypes, ROOT_URL } from "../utils/constants";
import store from "../reducers/store";

const {
	SET_ASSETS, 
	SAVE_ASSET_DETAILS,
	DELETE_ASSET,
} = actionTypes;

export function fetchAssetsData(){
	// console.log("fetched assetsData: ", assetsData)
	const request = axios.get(`${ROOT_URL}/data/allAssets`);

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

export function persistAllAssets(newData, oldData){
	const { dispatch } = store;
	// make api post request w data
	// console.log("persisting data: ", data);
	const request = axios.post(`${ROOT_URL}/data/update`, newData);
	request
		.then( function _handleDataUpdateSuccess_(res) {
			console.log("persisited: ", res.data);
		})
		.catch( function _handleDataUpdateFailur_(err) {
			console.log("couldn't persist: ", err.response.data );
			dispatch({
				type: SET_ASSETS,
				payload: oldData
			});
		});
}

export function saveDetails(assetDetails){
	// console.log("assetDetails: ", assetDetails);
	return {
		type: SAVE_ASSET_DETAILS,
		payload: assetDetails
	}
}

export function deleteAsset(assetId){
	// console.log(`deleting asset ${assetId}`);
	return {
		type: DELETE_ASSET,
		payload: {assetId}
	}
}
