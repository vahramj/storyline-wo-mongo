import update from "immutability-helper";

import {
	getData,
	selectAsset,
	insertAsset,
	removeAssetFromParent,
	// moveAsset,
	setInitialAssetPosition,
	calcInsertPositionIntoSiblings,
	getChildren,
	removeAssetById
} from "../utils/appLogic";

import { actionTypes, /* dndTypes */ } from "../constants";

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

const initialState = {
	data: getData(),
	selectedAssetId: null,
	insertIndicator: {
		targetId: null,
		position: null
	}
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case SELECT_ASSET: {
			const { assetId } = action.payload;
			const selectedAssetId = selectAsset(assetId, state.data);
			return { ...state, selectedAssetId };
		}

		case DESELECT_ASSET: {
			const selectedAssetId = selectAsset();
			return { ...state, selectedAssetId };
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

		case DROP_ASSET: {
			// console.log("asset is being dropped");
			const { sourceId, targetId, dropPosition, /* moveAmount, sourceDnDType */ } = action.payload;
			// console.log("moveAmount: ", moveAmount);
			let { data } = state;
			// const { parent } = data[sourceId];
			// if (parent && parent.id === targetId && sourceDnDType === dndTypes.TIMELINE_ASSET) {
			// 	// data = moveAsset(sourceId, moveAmount, data);
			// } else {
			// }
			data = insertAsset(sourceId, targetId, dropPosition, data);
			return { ...state, data };
		}

		case REMOVE_ASSET_FROM_PARENT: {
			// console.log("action.payload: ", action.payload)
			const data = removeAssetFromParent(action.payload.assetId, state.data);
			return { ...state, data };
		}

		case FIT_TIMELINE_TO_FRAME: {
			const { timelineId, timelineFrameWidth } = action.payload;
			// console.log(timelineFrameWidth, timelineId)
			const updatedData = update(state.data, {
				[timelineId]: {
					width: { $set: timelineFrameWidth }
				}
			});

			return { ...state, data: updatedData };
		}

		case CALC_INSERT_POSITION: {
			const { targetId, sourceId, hoverPositionRelToTarget } = action.payload;
			// console.log("sourceId: ", sourceId)

			const sourceAsset = setInitialAssetPosition(
				state.data[sourceId],
				hoverPositionRelToTarget
			);
			let siblings = getChildren(targetId, state.data);
			// make sure insert indicator doesn't snap at itself when moving
			if (sourceAsset.parent && sourceAsset.parent.id === targetId) {
				siblings = removeAssetById(sourceId, siblings);
			}
			// const insertPosition = sourceAsset.position;
			const { insertPosition } = calcInsertPositionIntoSiblings(sourceAsset, siblings);
			// console.log(insertPosition)

			// return { ...state, insertPosition: hoverPositionRelToTarget + targetAsset.position}
			const insertIndicator = {
				targetId,
				position: insertPosition
			};
			// console.log("insertIndicator from rootReducer: ", insertIndicator);
			return { ...state, insertIndicator };
		}

		case HIDE_INSERT_POSITION: {
			return { ...state, insertPosition: null };
		}

		default:
			return state;
	}
}

export default rootReducer;
