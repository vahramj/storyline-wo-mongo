import React from "react";
import { string, bool, func } from "prop-types";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import _ from "lodash";

import { dndTypes } from "../../utils/constants";
import { persistAllAssets } from "../../actions/networkActionCreators";

const spec = {
	beginDrag(props){
		// console.log("tail drag begun");
		const {ownerId, getOwnerElem} = props;
		const ownerElem = getOwnerElem();
		// console.log(props, ownerElem);
		return {ownerId, ownerElem};
	},
	endDrag(props){
		console.log("tail drag is over");
		props.persistAllAssets()
	}
};

const collect = (connectDnD) => {
	return {
		connectDragSource: connectDnD.dragSource(),
		connectDragPreview: connectDnD.dragPreview()
	};
};

const TimelineAssetTail = props => {
	const {type, selected, connectDragSource, connectDragPreview} = props;
	return connectDragSource(
		<div
			className="tail"
			style={{
				visibility: type === "scene" || !selected ? "hidden" : ""
			}}
		>
			{
				connectDragPreview(<div className="hidden-drag-preview" />)
			}
		</div>
	);	
};

TimelineAssetTail.propTypes = {
	type: string.isRequired,
	selected: bool.isRequired,
	connectDragSource: func.isRequired,
	connectDragPreview: func.isRequired,
	ownerId: string.isRequired,
	getOwnerElem: func
};

TimelineAssetTail.defaultProps = {
	getOwnerElem(){console.log("vahram, getOwnerElem is not passed in")}
};

const decorator = _.flowRight([
	connect(null, {persistAllAssets}),
	DragSource(dndTypes.TAIL, spec, collect)
]);
export default decorator(TimelineAssetTail);