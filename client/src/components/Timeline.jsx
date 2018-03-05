import React, { Component } from "react";
import { number, string, func, bool, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import _ from "lodash";

import TimelineBody from "./TimelineBody";
import {
	handleTimelineClick,
	fitTimelineToFrame,
	handleDropAsset,
	calcInsertPosition,
	hideInsertPosition
} from "../actions/actionCreators";
import { dndTypes } from "../constants";
import { assetTypeHierarchy } from "../utils/appLogic";

import "./styles/Timeline.css";

// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const dropSpec = {
	drop(props, monitor, { dropElem }) {
		if (monitor.didDrop()) {
			return;
		}
		const targetId = props.timelineId;
		const { assetId: sourceId } = monitor.getItem();
		const dropPosition = monitor.getClientOffset().x;
		const moveAmount = monitor.getDifferenceFromInitialOffset().x;
		const sourceDnDType = monitor.getItemType();
		// console.log("sourceDnDType: ", sourceDnDType);
		const params = {
			sourceId,
			targetId,
			dropPosition,
			dropElem,
			moveAmount,
			sourceDnDType
		};

		props.handleDropAsset(params);
		// props.hideInsertPosition();
	},
	hover(props, monitor, { dropElem }) {
		if (monitor.canDrop()) {
			const { timelineId: targetId } = props;
			const hoverPosition = monitor.getClientOffset().x;
			// console.log( "isOver: ", monitor.isOver({shallow: true}), "canDrop: ", monitor.canDrop() );
			const params = {
				hoverPosition,
				dropElem,
				targetId
			};
			props.calcInsertPosition(params);
		}
		// else if(props.insertPosition && monitor.isOver({shallow: true})){
		// 	// console.log("shallow but can't drop")
		// 	props.hideInsertPosition()
		// }
		// else{
		// 	// console.log("shallow but can't drop")
		// 	props.hideInsertPosition()
		// }
	},

	canDrop(props, monitor) {
		// console.log("isOver timeline: ", monitor.isOver())
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

const collectDnD = (connectDnD, monitor) => {
	// const hoverPosition = monitor.getClientOffset() ? monitor.getClientOffset().x : null;
	// console.log("hoverPosition: ", hoverPosition);
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

class Timeline extends Component {
	componentDidMount() {
		this.setDefaultWidth();
		window.addEventListener("resize", this.setDefaultWidth);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.setDefaultWidth);
	}

	onClickHandler = event => {
		const { timelineId } = this.props;

		event.stopPropagation();
		this.props.handleTimelineClick(event, timelineId);
	};

	setDefaultWidth = () => {
		const { defaultWidth, width, timelineId } = this.props;

		if (defaultWidth) {
			const timelineFrameWidth = this.timelineElem.getBoundingClientRect().width;
			// vahram, this check is for tight resize, which we will come back to later
			if (timelineFrameWidth > width) {
				this.props.fitTimelineToFrame(timelineFrameWidth, timelineId);
			}
		}
	};

	render() {
		const {
			width,
			childAssets,
			connectDropTarget,
			isHovering,
			canDrop,
			insertPosition
		} = this.props;
		// console.log("insertPosition: ", insertPosition);
		const hoverDisplay = isHovering && canDrop ? "block" : "none";



		return connectDropTarget(
			<div
				className="timeline"
				ref={elem => {
					this.timelineElem = elem;
				}}
			>
				<div
					className="scroll-body"
					role="none"
					onClick={this.onClickHandler}
					style={{ width }}
					ref={elem => {
						this.dropElem = elem;
					}}
				>

					<div className="drag-hover" style={{ display: `${hoverDisplay}` }} />
					<TimelineBody childAssets={childAssets} width={width} 
					insertPosition={insertPosition}
					/>
				</div>
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

Timeline.propTypes = {
	timelineId: string.isRequired,
	width: number.isRequired,
	defaultWidth: bool,
	handleTimelineClick: func,
	fitTimelineToFrame: func,
	childAssets: arrayOf(
		shape({
			id: string
		})
	).isRequired,
	connectDropTarget: func.isRequired,
	isHovering: bool.isRequired,
	canDrop: bool.isRequired,
	insertPosition: number
};

Timeline.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, Timeline scroll-body click handler hasn't been setup ");
	},
	fitTimelineToFrame: () => {
		console.log("Vahram, update timeline width to fit the frame");
	},
	defaultWidth: false,
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
	fitTimelineToFrame,
	handleDropAsset,
	calcInsertPosition,
	hideInsertPosition
};

function mapStateToProps({ data, insertIndicator }) {
	// console.log("insertIndicator from Timelne: ", insertIndicator)
	const timelineId = "tmln_01";
	const timelineAsset = data[timelineId];
	const { width, defaultWidth, children } = timelineAsset;
	const insertPosition = insertIndicator.targetId === timelineId ? insertIndicator.position : null; 
	return {
		timelineId,
		width,
		defaultWidth,
		childAssets: children,
		type: "timeline",
		insertPosition
	};
}

const decorator = _.flowRight([
	connect(mapStateToProps, actions),
	DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET], dropSpec, collectDnD)
]);
export default decorator(Timeline);
