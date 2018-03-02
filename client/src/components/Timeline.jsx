import React, { Component } from "react";
import { number, string, func, bool, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import _ from "lodash";

import TimelineBody from "./TimelineBody";
import {
	handleTimelineClick,
	fitTimelineToFrame,
	handleDropAsset
} from "../actions/actionCreators";
import { dndTypes } from "../constants";
import { assetTypeHierarchy } from "../utils/appLogic";

import "./styles/Timeline.css";

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
		const { width, childAssets, connectDropTarget } = this.props;

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
					<TimelineBody childAssets={childAssets} width={width} />
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
	type: string.isRequired
};

Timeline.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, Timeline scroll-body click handler hasn't been setup ");
	},
	fitTimelineToFrame: () => {
		console.log("Vahram, update timeline width to fit the frame");
	},
	defaultWidth: false
};

// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const dropSpec = {
	drop(props, monitor, component) {
		if (monitor.didDrop()) {
			return;
		}
		const targetId = props.timelineId;
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

const collectDnD = connectDnD => {
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
const actions = { handleTimelineClick, fitTimelineToFrame, handleDropAsset };

function mapStateToProps({ data }) {
	const timelineId = "tmln_01";
	const timelineAsset = data[timelineId];
	const { width, defaultWidth, children } = timelineAsset;

	return {
		timelineId,
		width,
		defaultWidth,
		childAssets: children,
		type: "timeline"
	};
}

const decorator = _.flowRight([
	connect(mapStateToProps, actions),
	DropTarget([dndTypes.ASSET, dndTypes.TIMELINE_ASSET], dropSpec, collectDnD)
]);
export default decorator(Timeline);


