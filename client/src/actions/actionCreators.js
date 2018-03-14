import { actionTypes } from "../utils/constants";

const {
	SELECT_ASSET,
	DESELECT_ASSET,
	CLICK_TIMELINE,
	FIT_TIMELINE_TO_FRAME,
	REMOVE_ASSET_FROM_PARENT,
	DROP_ASSET,
	CALC_INSERT_POSITION,
	HIDE_INSERT_POSITION,
	RESIZE_ASSET_TO_POSITION,
	SET_FRAME_REQUESTOR,
	SET_SEARCH_TERM
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
	// Vahram, move elemPos calculation to Timeline & TimelineAsset
	const elemPosRelToViewport = Math.round(event.currentTarget.getBoundingClientRect().left);
	const clickPosition = clickPosRelToViewport - elemPosRelToViewport;
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
	} = params;

	// Vahram, move elemPos calculation to Timeline & TimelineAsset
	const elemPosRelToViewport = Math.round(dropElem.getBoundingClientRect().left);
	const dropPosition = dropPositionRelToViewport - elemPosRelToViewport;
	return {
		type: DROP_ASSET,
		payload: {
			sourceId,
			targetId,
			dropPosition,
		}
	};
}

export function fitTimelineToFrame(timelineFrameWidth, timelineId) {
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
		targetId,
		sourceId,
	} = params;

	const elemPosRelToViewport = Math.round(dropElem.getBoundingClientRect().left);
	const hoverPositionRelToTarget = hoverPosition - elemPosRelToViewport;
	// console.log("sourceId: ", sourceId);

	return {
		type: CALC_INSERT_POSITION,
		payload: {
			targetId,
			sourceId,
			hoverPositionRelToTarget
		}
	};
}

export function hideInsertPosition(){
	return {
		type: HIDE_INSERT_POSITION,
		payload: null
	};
}

export function resizeAssetToPosition(assetId, position){
	// console.log("from action creators: ", assetId, position);
	return {
		type: RESIZE_ASSET_TO_POSITION,
		payload: {
			assetId,
			position
		}
	}
}

export function setFrameRequestor(assetId, requestedFrame){
	return {
		type: SET_FRAME_REQUESTOR,
		payload: {assetId, requestedFrame}
	}
}

export function setSearchTerm(term, searchType){
	return {
		type: SET_SEARCH_TERM,
		payload: {searchType, term}
	}
}
