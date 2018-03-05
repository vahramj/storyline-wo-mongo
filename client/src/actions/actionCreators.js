import { actionTypes } from "../constants";

const {
	SELECT_ASSET,
	DESELECT_ASSET,
	CLICK_TIMELINE,
	FIT_TIMELINE_TO_FRAME,
	REMOVE_ASSET_FROM_PARENT,
	DROP_ASSET,
	CALC_INSERT_POSITION,
	HIDE_INSERT_POSITION
} = actionTypes;

export function selectAsset(assetId) {
	return {
		type: SELECT_ASSET,
		payload: { assetId }
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
	// console.log(
	// 	"clickPosRelToViewport: ",
	// 	clickPosRelToViewport,
	// 	"elemPosRelToViewport: ",
	// 	elemPosRelToViewport,
	// 	"clickPosition: ",
	// 	clickPosition
	// );
	// console.log("target elem: ", event.currentTarget);
	return {
		type: CLICK_TIMELINE,
		payload: {
			clickPosition,
			assetId
		}
	};
}

export function handleDropAsset(params) {
	const {
		sourceId,
		targetId,
		dropPosition: dropPositionRelToViewport,
		dropElem,
		moveAmount,
		sourceDnDType
	} = params;
	// console.log(dropPositionRelToViewport)
	// console.log("moveAmount: ", moveAmount);
	const elemPosRelToViewport = Math.round(dropElem.getBoundingClientRect().left);
	const dropPosition = dropPositionRelToViewport - elemPosRelToViewport;
	return {
		type: DROP_ASSET,
		payload: {
			sourceId,
			targetId,
			dropPosition,
			moveAmount,
			sourceDnDType
		}
	};
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

export function calcInsertPosition(params){
	const {
		hoverPosition, 
		dropElem,
		targetId
	} = params;

	const elemPosRelToViewport = Math.round(dropElem.getBoundingClientRect().left);
	const hoverPositionRelToTarget = hoverPosition - elemPosRelToViewport;
	// console.log("targetId: ", targetId);

	return {
		type: CALC_INSERT_POSITION,
		payload: {
			targetId,
			hoverPositionRelToTarget
		}
	}
}

export function hideInsertPosition(){
	return {
		type: HIDE_INSERT_POSITION,
		payload: null
	}
}
