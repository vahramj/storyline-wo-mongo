import React, { Component } from "react";
import { number, bool, string, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { DragSource, DropTarget } from "react-dnd";
import _ from "lodash";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";
import {
	handleTimelineClick,
	handleDropAsset,
	selectAsset,
	calcInsertPosition,
	hideInsertPosition
} from "../actions/actionCreators";
import { dndTypes } from "../constants";
import { assetTypeHierarchy } from "../utils/appLogic";
// import shallowEqual from "../utils/shallowEqual";

import "./styles/TimelineAsset.css";

// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const dragSpec = {
	beginDrag(props) {
		const { assetId, type } = props;

		props.selectAsset(assetId);
		// console.log("beginDrag: ", assetId);
		return { assetId, type };
	}
};

const dropSpec = {
	drop(props, monitor, { dropElem }) {
		if (monitor.didDrop()) {
			return;
		}

		const targetId = props.assetId;
		const { assetId: sourceId } = monitor.getItem();
		// console.log("dragElem: ", dragElem);
		// console.log("initialClientOffset: ", monitor.getInitialClientOffset());
		const grabPosLeftEdgeOffset = monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x
		const dropPosition = monitor.getClientOffset().x;

		// const moveAmount = monitor.getDifferenceFromInitialOffset().x;
		// const sourceDnDType = monitor.getItemType();
		const params = {
			sourceId,
			targetId,
			dropPosition,
			dropElem,
			grabPosLeftEdgeOffset,
			// moveAmount,
			// sourceDnDType
		};

		props.handleDropAsset(params);
		// props.hideInsertPosition();
	},
	hover(props, monitor, { dropElem }) {
		if (monitor.canDrop()) {
			// console.log("hovering & can drop")
			const { assetId: targetId } = props;
			const sourceId = monitor.getItem().assetId;
			const hoverPosition = monitor.getClientOffset().x;
			const params = {
				hoverPosition,
				dropElem,
				targetId,
				sourceId
			};
			props.calcInsertPosition(params);
		}
		// else if(props.insertPosition && monitor.isOver({shallow: true})){
		// 	// console.log("shallow but can't drop")
		// 	props.hideInsertPosition()
		// }
	},
	canDrop(props, monitor) {
		// console.log("isOver asset: ", monitor.isOver())

		const { type: sourceType } = monitor.getItem();
		const { type: targetType } = props;
		// console.log("sourceType: ", sourceType, "targetType: ", targetType);
		// vahram, use legalCheck from app logic
		if (sourceType === assetTypeHierarchy[targetType].child) {
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

const collectDrop = (connectDnD, monitor) => {
	return {
		connectDropTarget: connectDnD.dropTarget(),
		isHovering: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
};

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
			connectDropTarget,
			isHovering,
			canDrop, 
			insertPosition
		} = this.props;

		const selectedStyle = selected ? "selected" : "";
		const draggingStyle = isDragging ? "dragging" : "";
		const hoverDisplay = isHovering && canDrop ? "block" : "none";
		// let insertPosition = null;
		// if(isHovering && canDrop){
		// 	insertPosition = this.props.insertPosition;
		// }

		// if (isDragging) {
		// 	return null;
		// }

		return _.flowRight([connectDragSource, connectDropTarget])(
			<div
				className={`timeline-asset ${selectedStyle} ${draggingStyle} timeline-${type}`}
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
				<div className="drag-hover" style={{ display: `${hoverDisplay}` }} />
				<div className="head">
					<Asset assetId={assetId} decorative />
				</div>

				<TimelineBody childAssets={childAssets} width={width} 
				insertPosition={insertPosition} 
				/>

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

// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
const actions = {
	handleTimelineClick,
	handleDropAsset,
	selectAsset,
	calcInsertPosition,
	hideInsertPosition
};

// const options = {
// 	arePropsEqual(props, otherProps){
// 		// console.log("props: ", props, "otherProps: ", otherProps);
// 		console.log(props.assetId)
// 		console.log(shallowEqual(props, otherProps));
// 	}
// };

function mapStateToProps({ data, selectedAssetId, insertIndicator }, { assetId }) {
	const { type, position, width, children } = data[assetId];

	const selected = selectedAssetId && assetId === selectedAssetId;
	// console.log("insertIndicator.targetId: ", insertIndicator.targetId, "assetId: ", assetId);
	// console.log("insertIndicator.position: ", insertIndicator.position);
	const insertPosition = insertIndicator.targetId === assetId ? insertIndicator.position : null; 

	return {
		selected,
		type,
		position,
		width,
		childAssets: children,
		insertPosition
	};
}

const decorator = _.flowRight([
	connect(mapStateToProps, actions ),
	DragSource(dndTypes.TIMELINE_ASSET, dragSpec, collectDrag),
	DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET], dropSpec, collectDrop )
]);
export default decorator(TimelineAsset);
// export default TimelineAsset;
