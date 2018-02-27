import update from "immutability-helper";

import {
	getData,
	selectAsset,
	insertAsset
} from "../utils/appLogic";

import { SELECT_ASSET, CLICK_TIMELINE, DESELECT_ASSET, FIT_TIMELINE_TO_FRAME } from "../actions/actionTypes";

const initialData = {
	data: getData(), 
	selectedAssetId: null
};

function rootReducer(state=initialData, action){
	switch (action.type){
		case SELECT_ASSET: {
			const { assetId } = action.payload;
			const selectedAssetId = selectAsset(assetId, state.data);
			return { ...state, selectedAssetId };
		}

		case DESELECT_ASSET: {
			const selectedAssetId = selectAsset();
			return { ...state, selectedAssetId }
		}

		case CLICK_TIMELINE: {
			let { selectedAssetId } = state;
			const { clickPosition, assetId } = action.payload;

			if (selectedAssetId && assetId !== selectedAssetId) {
				const data = insertAsset(selectedAssetId, assetId, clickPosition, state.data);
				return { ...state, data };
			}

			selectedAssetId = selectAsset(assetId, state.data);
			return { ...state, selectedAssetId };
		}

		case FIT_TIMELINE_TO_FRAME: {
			const { timelineId, timelineFrameWidth } = action.payload;
			console.log(timelineFrameWidth, timelineId)
			const updatedData = update(state.data, {
				[timelineId]: {
					width: { $set: timelineFrameWidth }
					
				}
			});

			return{ ...state, data: updatedData };
		}

		default: 
			return state;
	}
}

export default rootReducer;