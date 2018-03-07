import React, { Component } from "react";
import { number, bool, string, func, arrayOf, shape } from "prop-types";
import _ from "lodash";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";

import "./styles/TimelineAsset.css";




class TimelineAsset extends Component {
	onClickHandler = (event) => {
		const {assetId} = this.props;
		event.stopPropagation();
		this.props.handleTimelineClick(event, assetId);
	}
	
	renderHead = () => {
		const {assetId, type} = this.props;
		let headElem = (
			<div className="head">
				<Asset assetId={assetId} decorative />
			</div>
		);

		if(type === "timeline"){
			headElem = null;
		}

		return headElem;
	}

	renderTail = () => {
		const {type, selected} = this.props;
		let tailElem = (
			<div
				className="tail"
				style={{
					visibility: type === "scene" || !selected ? "hidden" : ""
				}}
			/>
		);

		if(type === "timeline"){
			tailElem = null;
		}

		return tailElem
	}

	render() {
		const {
			selected,
			type,
			position,
			width,
			childAssets,
			isDragging,
			connectDropTarget,
			isHovering,
			canDrop, 
		} = this.props;
		let {
			insertPosition,
			connectDragSource,
		} = this.props;

		if(type === "timeline"){
			connectDragSource = f => f;
		}

		const selectedStyle = selected ? "selected" : "";
		const draggingStyle = isDragging ? "dragging" : "";
		const hoverDisplay = isHovering && canDrop ? "block" : "none";
		insertPosition = isHovering && insertPosition!==null ? insertPosition : null;

		// if (isDragging) {
		// 	return null;
		// }

		return _.flowRight([connectDragSource, connectDropTarget])(
			<div
				className={`timeline-asset ${selectedStyle} ${draggingStyle} timeline-${type}`}
				role="none"
				onClick={this.onClickHandler}
				style={{ left: position }}
				ref={elem => {
					this.dropElem = elem;
				}}
			>
				<div className="drag-hover" style={{ display: `${hoverDisplay}` }} />

				{this.renderHead()}

				<TimelineBody childAssets={childAssets} width={width} 
				insertPosition={insertPosition} 
				/>

				{this.renderTail()}
			</div>
		);
	}
}

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
TimelineAsset.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	position: number.isRequired,
	width: number.isRequired,
	handleTimelineClick: func,
	selected: bool,
	childAssets: arrayOf(
		shape({
			id: string
		})
	).isRequired,
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
