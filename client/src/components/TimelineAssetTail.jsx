import React, { Component } from "react";
import { string, bool, func, shape } from "prop-types";
import { DragSource } from "react-dnd";
// import { connect } from "react-redux";
import _ from "lodash";

import { dndTypes } from "../utils/constants";

const spec = {
	beginDrag(props){
		// console.log("tail drag begun");
		const {ownerId, ownerElem} = props;
		return {ownerId, ownerElem};
	}
};

const collect = (connectDnD) => {
	return {
		connectDragSource: connectDnD.dragSource(),
	};
};

class TimelineAssetTail extends Component {
	render(){
		const {type, selected, connectDragSource} = this.props;
		return connectDragSource(
			<div
				className="tail"
				style={{
					visibility: type === "scene" || !selected ? "hidden" : ""
				}}
			/>
		);	
	}
};

TimelineAssetTail.propTypes = {
	type: string.isRequired,
	selected: bool.isRequired,
	connectDragSource: func.isRequired,
	ownerId: string.isRequired,
	ownerElem: shape()
};

TimelineAssetTail.defaultProps = {
	ownerElem: {}
};

const decorator = _.flowRight([
	// connect, 
	DragSource(dndTypes.TAIL, spec, collect)
]);
export default decorator(TimelineAssetTail);