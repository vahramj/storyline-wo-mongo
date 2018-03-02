import React, { Component } from "react";
import { number, bool, string, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";
import { handleTimelineClick, handleDropAsset } from "../actions/actionCreators";
import { dndTypes } from "../constants";

import "./styles/TimelineAsset.css";

// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝
class TimelineAsset extends Component {
	render(){

		const {
			selected,
			assetId,
			type,
			position,
			width,
			childAssets,
			connectDragSource,
			isDragging,
			connectDropTarget
		} = this.props;

		const selectedStyle = selected ? "selected" : "";

		if (isDragging) {
			return null;
		}

		return connectDragSource(
			connectDropTarget(
				<div
					className={`timeline-asset ${selectedStyle} timeline-${type}`}
					role="none"
					onClick={event => {
						event.stopPropagation();
						this.props.handleTimelineClick(event, assetId);
					}}	
					style={{ left: position }}
					ref={elem => {
						this.dropElem = elem;
					}}
				>
					<div className="head">
						<Asset assetId={assetId} decorative />
					</div>

					<TimelineBody childAssets={childAssets} width={width} />

					<div
						className="tail"
						style={{
							visibility: type === "scene" || !selected ? "hidden" : ""
						}}
					/>
				</div>
			)
		);
	}
};

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
	connectDropTarget: func.isRequired
};

TimelineAsset.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selected: false
};

// ██████╗ ███████╗ █████╗  ██████╗████████╗    ██████╗ ███╗   ██╗██████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██╔══██╗████╗  ██║██╔══██╗
// ██████╔╝█████╗  ███████║██║        ██║       ██║  ██║██╔██╗ ██║██║  ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║       ██║  ██║██║╚██╗██║██║  ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║       ██████╔╝██║ ╚████║██████╔╝
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝       ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const dragSpec = {
	beginDrag(props) {
		const { assetId } = props;
		// console.log("beginDrag: ", assetId);
		return { assetId };
	}
};

const dropSpec = {
	drop(props, monitor, component) {
		if(monitor.didDrop()){
			return;
		}

		const targetId = props.assetId;
		const { assetId: sourceId } = monitor.getItem();
		const dropPosition = monitor.getClientOffset().x;
		const moveAmount = monitor.getDifferenceFromInitialOffset().x;
		// console.log("component: ", component);
		props.handleDropAsset(sourceId, targetId, dropPosition, component.dropElem, moveAmount);
	}
};

const collectDrag = (connectDnD, monitor) => {
	return {
		connectDragSource: connectDnD.dragSource(),
		isDragging: monitor.isDragging()
	};
};

const collectDrop = connectDnD => {
	return {
		connectDropTarget: connectDnD.dropTarget()
	};
};
// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗     ██████╗ ██████╗ ███╗   ██╗███╗   ██╗███████╗ ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝    ██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝     ██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║        ██║
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗     ██║     ██║   ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║        ██║
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗    ╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║███████╗╚██████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═╝
function mapDispatchToProps(dispatch) {
	return {
		handleTimelineClick(event, assetData) {
			return dispatch( handleTimelineClick(event, assetData) );
		},
		handleDropAsset(sourceId, targetId, dropPosition, dropElem, moveAmount) {
			return dispatch(
				handleDropAsset(sourceId, targetId, dropPosition, dropElem, moveAmount)
			);
		}
	};
}

function mapStateToProps({ data, selectedAssetId }, { assetId }) {
	const { type, position, width, children } = data[assetId];

	const selected = selectedAssetId && assetId === selectedAssetId;
	return {
		selected,
		type,
		position,
		width,
		childAssets: children
	};
}

const droppableTimelineAsset = DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET], dropSpec, collectDrop)(
	TimelineAsset
);
const draggableTimelineAsset = DragSource(dndTypes.TIMELINE_ASSET, dragSpec, collectDrag)(
	droppableTimelineAsset
);
const connectedTimelineAsset = connect(mapStateToProps, mapDispatchToProps)(draggableTimelineAsset);

export default connectedTimelineAsset;
// export default TimelineAsset;
