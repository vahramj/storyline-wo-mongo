import { connect } from "react-redux";

import TimelineAssetDnD from "./TimelineAssetDnD";
import {
	handleTimelineClick,
	handleDropAsset,
	selectAsset,
	calcInsertPosition,
	hideInsertPosition,
	resizeAssetToPosition,
	setFrameRequestor
} from "../actions/actionCreators";


const actions = {
	handleTimelineClick,
	handleDropAsset,
	selectAsset,
	calcInsertPosition,
	hideInsertPosition,
	resizeAssetToPosition,
	setFrameRequestor
};

// const options = {
// 	arePropsEqual(props, otherProps){
// 		// console.log("props: ", props, "otherProps: ", otherProps);
// 		console.log(props.assetId)
// 		console.log(shallowEqual(props, otherProps));
// 	}
// };

function mapStateToProps({ data, selectedAssetId, insertIndicator, frameRequestors }, { assetId }) {
	const { type, position, width, children } = data[assetId];

	const selected = !!(selectedAssetId && assetId === selectedAssetId);
	// console.log("insertIndicator.targetId: ", insertIndicator.targetId, "assetId: ", assetId);
	// console.log("insertIndicator.position: ", insertIndicator.position);
	const insertPosition = insertIndicator.targetId === assetId ? insertIndicator.position : null; 

	return {
		selected,
		type,
		position,
		width,
		childAssets: children,
		insertPosition,
		frameRequestors
	};
}

export default connect(mapStateToProps, actions )(TimelineAssetDnD);