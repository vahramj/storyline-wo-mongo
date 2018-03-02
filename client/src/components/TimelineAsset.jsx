import React, { Component } from "react";
import { number, bool, string, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import _ from "lodash";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";
import { handleTimelineClick, handleDropAsset } from "../actions/actionCreators";
import { dndTypes } from "../constants";
import { assetTypeHierarchy } from "../utils/appLogic";

import "./styles/TimelineAsset.css";

// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝
class TimelineAsset extends Component {
	render() {
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

		return _.flowRight([
				connectDragSource, 
				connectDropTarget
			])(
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
	connectDropTarget: func.isRequired
};

TimelineAsset.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selected: false
};

// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const dragSpec = {
	beginDrag(props) {
		const { assetId, type } = props;
		// console.log("beginDrag: ", assetId);
		return { assetId, type };
	}
};

const dropSpec = {
	drop(props, monitor, component) {
		if (monitor.didDrop()) {
			return;
		}

		const targetId = props.assetId;
		const { assetId: sourceId } = monitor.getItem();
		const dropPosition = monitor.getClientOffset().x;
		const moveAmount = monitor.getDifferenceFromInitialOffset().x;
		// console.log("component: ", component);
		props.handleDropAsset(sourceId, targetId, dropPosition, component.dropElem, moveAmount);
	},
	canDrop(props, monitor){
		const {type: sourceType} = monitor.getItem();
		const {type: targetType} = props;
		console.log("sourceType: ", sourceType, "targetType: ", targetType);
		if(sourceType === assetTypeHierarchy[targetType].child){
			return true;
		}
		return false;
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

// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝ 
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗ 
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
const actions = { handleTimelineClick, handleDropAsset };

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

const decorator = _.flowRight([
	connect(mapStateToProps, actions),
	DragSource(dndTypes.TIMELINE_ASSET, dragSpec, collectDrag),
	DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET], dropSpec, collectDrop)
]);
export default decorator(TimelineAsset);
// export default TimelineAsset;
