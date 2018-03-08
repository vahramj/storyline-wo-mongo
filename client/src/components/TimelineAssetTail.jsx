import React from "react";
import { string, bool, func, shape } from "prop-types";
import { DragSource } from "react-dnd";
import _ from "lodash";

import { dndTypes } from "../utils/constants";

const spec = {
	beginDrag(props){
		// console.log("tail drag begun");
		const {ownerId, getOwner} = props;
		const ownerElem = getOwner();
		// console.log(props, ownerElem);
		return {ownerId, ownerElem};
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
				connectDragPreview(<div className="preview" />)
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
	ownerElem: shape()
};

TimelineAssetTail.defaultProps = {
	ownerElem: {}
};

const decorator = _.flowRight([
	DragSource(dndTypes.TAIL, spec, collect)
]);
export default decorator(TimelineAssetTail);