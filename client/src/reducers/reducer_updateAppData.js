// this function't logic went into root reducer
// vahram, delete this and all other reducers after finishing root reducer

import { getData } from "../utils/appLogic";
import { SELECT_ASSET, CLICK_TIMELINE } from "../actions/actionTypes";

const data = {assets: getData()};

function clickTimeline(state=data, payload){
	switch (action.type){
		case SELECT_ASSET:
			console.log("selected asset:", action.payload);
			return {...state, selectedAssetId: action.payload};

		case CLICK_TIMELINE:
			const {clickPosition, asset} = payload;
			const { selectedAssetId } = state

			if (selectedAssetId && asset.id !== selectedAssetId) {
				// const selectedAsset = this.state.data[selectedAssetId];
				// this.insertAsset(selectedAsset, asset, clickPosition);
				return;
			}
			return {...state, selectedAssetId: action.payload};

		default: 
			return state;
	}
}

export default clickTimeline;


