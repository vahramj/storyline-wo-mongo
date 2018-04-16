import React, { Component } from "react";
import { number, bool, string, func /* arrayOf, shape */ } from "prop-types";
import { DragSource, DropTarget } from "react-dnd";
import _ from "lodash";

import TimelineAsset from "./TimelineAsset";

import { dndTypes } from "../../utils/constants";
import { dragSpec, dropSpec, collectDrag, collectDrop } from "./TimelineAssetDnDSpecs";

import "./styles/TimelineAssetDnD.css";

class TimelineAssetDnD extends Component {
	onClickHandler = event => {
		const { assetId } = this.props;
		event.stopPropagation();
		this.props.handleTimelineClick(event, assetId);
	};

	getOwnerElem = () => {
		return this.dropElem;
	};

	render() {
		const {
			assetId,
			selected,
			type,
			position,
			isDragging,
			connectDropTarget,
			isHovering,
			canDrop
		} = this.props;
		let { 
			connectDragSource, 
			connectDragPreview,
			insertPosition 
		} = this.props;

		if (type === "timeline") {
			connectDragSource = f => f;
			connectDragPreview = f => f;
		}

		const selectedStyle = selected ? "selected" : "";
		const draggingStyle = isDragging ? "dragging" : "";
		const hoverDisplay = isHovering && canDrop ? "block" : "none";
		insertPosition = isHovering && insertPosition !== null ? insertPosition : null;

		return _.flowRight([connectDragSource, connectDropTarget])(
			<div
				className={`timeline-asset-dnd ${selectedStyle} ${draggingStyle} `}
				role="none"
				onClick={this.onClickHandler}
				style={{ left: position }}
				ref={elem => {
					this.dropElem = elem;
				}}
			>
				{
				<div className="drag-hover" style={{ display: `${hoverDisplay}` }} />
				}
				<TimelineAsset
					getOwnerElem={this.getOwnerElem}
					assetId={assetId}
					insertPosition={insertPosition}
					selected={selected}
				/>
				{
					connectDragPreview(<div className="hidden-drag-preview" />)
				}
			</div>
		);
	}
}

TimelineAssetDnD.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	position: number.isRequired,
	handleTimelineClick: func,
	selected: bool,
	connectDragSource: func.isRequired,
	connectDragPreview: func.isRequired,
	isDragging: bool.isRequired,
	connectDropTarget: func.isRequired,
	isHovering: bool.isRequired,
	canDrop: bool.isRequired,
	insertPosition: number
};

TimelineAssetDnD.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, TimelineAssetDnD click handler hasn't been setup ");
	},
	selected: false,
	insertPosition: null
};

const decorator = _.flowRight([
	DragSource(dndTypes.TIMELINE_ASSET, dragSpec, collectDrag),
	DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET, dndTypes.TAIL], dropSpec, collectDrop)
]);

export default decorator(TimelineAssetDnD);
