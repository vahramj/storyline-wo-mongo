import update from "immutability-helper";

import {
	getData,
	selectAsset,
	insertAsset,
	removeAssetFromParent,
	// moveAsset,
	makeInitiallyPositionedAsset,
	calcInsertPositionIntoSiblings,
	getChildren,
	removeAssetById,
	resizeAssetToPosition
} from "../utils/appLogic";

import { actionTypes } from "../utils/constants";

// console.log("inside assetsDataReducer");

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
	SET_FRAME_REQUESTOR
} = actionTypes;

const initialState = {
	data: getData(),
	selectedAssetId: null,
	insertIndicator: {
		targetId: null,
		position: null
	},
	frameRequestors: {}
};

function assetsDataReducer(state = initialState, action) {
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
				const data = insertAsset({
					sourceId: selectedAssetId,
					targetId: assetId,
					position: clickPosition,
					data: state.data,
				});
				return { ...state, data };
			}

			selectedAssetId = selectAsset(assetId, state.data);
			return { ...state, selectedAssetId };
		}

		case DROP_ASSET: {
			// console.log("asset is being dropped");
			const { sourceId, targetId, dropPosition } = action.payload;
			let { data } = state;

			data = insertAsset({
				sourceId,
				targetId,
				data,
				position: dropPosition,
			});
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
			// console.log("calcing insert pos")
			const { targetId, sourceId, hoverPositionRelToTarget } = action.payload;

			const sourceAsset = makeInitiallyPositionedAsset(
				state.data[sourceId],
				hoverPositionRelToTarget
			);
			let siblings = getChildren(targetId, state.data);
			// make sure insert indicator doesn't snap at itself when moving
			if (sourceAsset.parent && sourceAsset.parent.id === targetId) {
				siblings = removeAssetById(sourceId, siblings);
			}
			const { insertPosition } = calcInsertPositionIntoSiblings(sourceAsset, siblings);
			// console.log(insertPosition)

			const insertIndicator = {
				targetId,
				position: insertPosition
			};
			// console.log("insertIndicator from assetsDataReducer: ", insertIndicator);
			return { ...state, insertIndicator };
		}

		case HIDE_INSERT_POSITION: {
			// console.log("hiding insert position");
			const insertIndicator = {
				targetId: null,
				position: null
			};
			return { ...state, insertIndicator };
		}

		case RESIZE_ASSET_TO_POSITION: {
			const {assetId, position} = action.payload;
			// console.log("from root reducer: ", assetId, position);
			const data = resizeAssetToPosition(assetId, position, state.data);
			return { ...state, data };
		}

		case SET_FRAME_REQUESTOR: {
			const {requestedFrame, assetId} = action.payload;
			const frameRequestors = Object.assign({},state.frameRequestors);
			// console.log("frameRequestors: ", frameRequestors)
			if(requestedFrame === null){
				delete frameRequestors[assetId]
			}
			else {
				frameRequestors[assetId] = requestedFrame
			}
			return {...state, frameRequestors};
		}

		default:
			return state;
	}
}

export default assetsDataReducer;
