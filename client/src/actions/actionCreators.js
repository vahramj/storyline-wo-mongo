import { actionTypes } from "../constants";

const {
	SELECT_ASSET,
	DESELECT_ASSET,
	CLICK_TIMELINE,
	FIT_TIMELINE_TO_FRAME,
	REMOVE_ASSET_FROM_PARENT,
	DROP_ASSET
} = actionTypes;

export function selectAsset(asset) {
	return {
		type: SELECT_ASSET,
		payload: { assetId: asset.id }
	};
}

export function deSelectAsset() {
	return {
		type: DESELECT_ASSET,
		payload: null
	};
}

export function handleTimelineClick(event, assetId) {
	const clickPosRelToViewport = event.clientX;
	const elemPosRelToViewport = Math.round(event.currentTarget.getBoundingClientRect().left);
	const clickPosition = clickPosRelToViewport - elemPosRelToViewport;
	console.log(
		"clickPosRelToViewport: ",
		clickPosRelToViewport,
		"elemPosRelToViewport: ",
		elemPosRelToViewport,
		// "clickPosition: ",
		// clickPosition
	);
	// console.log("target elem: ", event.currentTarget);
	return {
		type: CLICK_TIMELINE,
		payload: {
			clickPosition,
			assetId
		}
	};
}

export function handleDropAsset(sourceId, targetId, dropPositionRelToViewport, dropElem){
	console.log(dropPositionRelToViewport)
	const elemPosRelToViewport = Math.round(dropElem.getBoundingClientRect().left);
	const dropPosition = dropPositionRelToViewport - elemPosRelToViewport;
	return {
		type: DROP_ASSET,
		payload: {
			sourceId,
			targetId,
			dropPosition
		}
	}
}

export function fitTimelineToFrame(timelineFrameWidth, timelineId) {
	// console.log(timelineFrameWidth, timelineId)
	return {
		type: FIT_TIMELINE_TO_FRAME,
		payload: { timelineFrameWidth, timelineId }
	};
}

export function removeAssetFromParent(assetId) {
	return {
		type: REMOVE_ASSET_FROM_PARENT,
		payload: { assetId }
	};
}
