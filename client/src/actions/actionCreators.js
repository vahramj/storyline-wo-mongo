import { actionTypes } from "../constants";

const { SELECT_ASSET, DESELECT_ASSET, CLICK_TIMELINE, FIT_TIMELINE_TO_FRAME, REMOVE_ASSET_FROM_PARENT } = actionTypes;

export function selectAsset(asset){
	return {
		type: SELECT_ASSET,
		payload: {assetId: asset.id}
	}
}

export function deSelectAsset(){
	return {
		type: DESELECT_ASSET,
		payload: null
	}
}

export function handleTimelineClick(event, assetId){
	const clickPosRelToViewport = event.clientX;
	const elemPosRelToViewport = Math.round(event.currentTarget.getBoundingClientRect().left);
	const clickPosition = clickPosRelToViewport - elemPosRelToViewport;

	return {
		type: CLICK_TIMELINE,
		payload: {
			clickPosition, 
			assetId
		}
	};
};

export function fitTimelineToFrame(timelineFrameWidth, timelineId){
	// console.log(timelineFrameWidth, timelineId)
	return {
		type: FIT_TIMELINE_TO_FRAME,
		payload: { timelineFrameWidth, timelineId }
	};
}

export function removeAssetFromParent(assetId){
	return {
		type: REMOVE_ASSET_FROM_PARENT,
		payload: {assetId}
	}
}
