import React, { Component } from "react";
import { number, bool, string, func /* arrayOf, shape */ } from "prop-types";
import _ from "lodash";

import TimelineAssetBase from "./TimelineAssetBase";

import "../styles/TimelineAsset/TimelineAsset.css";

class TimelineAsset extends Component {
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
		let { connectDragSource, insertPosition } = this.props;

		if (type === "timeline") {
			connectDragSource = f => f;
		}

		const selectedStyle = selected ? "selected" : "";
		const draggingStyle = isDragging ? "dragging" : "";
		const hoverDisplay = isHovering && canDrop ? "block" : "none";
		insertPosition = isHovering && insertPosition !== null ? insertPosition : null;

		return _.flowRight([connectDragSource, connectDropTarget])(
			<div
				className={`timeline-asset ${selectedStyle} ${draggingStyle} `}
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
				<TimelineAssetBase
					getOwnerElem={this.getOwnerElem}
					assetId={assetId}
					insertPosition={insertPosition}
					selected={selected}
				/>
			</div>
		);
	}
}

TimelineAsset.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	position: number.isRequired,
	handleTimelineClick: func,
	selected: bool,
	connectDragSource: func.isRequired,
	isDragging: bool.isRequired,
	connectDropTarget: func.isRequired,
	isHovering: bool.isRequired,
	canDrop: bool.isRequired,
	insertPosition: number
};

TimelineAsset.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selected: false,
	insertPosition: null
};

export default TimelineAsset;
