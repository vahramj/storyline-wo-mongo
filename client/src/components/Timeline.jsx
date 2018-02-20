import React, { Component } from "react";
import { shape, object, func } from "prop-types";

import TimelineBody from "./TimelineBody";

import "./styles/Timeline.css";

const timelineId = "tmln_01";

class Timeline extends Component {
	componentDidMount() {
		const timelineData = this.props.data.timeline[timelineId];

		const timelineWidth = this.timelineElem.getBoundingClientRect().width;
		// this.setState({timelineWidth})
		if(timelineData.width === 0){
			this.props.updateTimelineWidth(timelineWidth, timelineId)
		}
		// console.log(timelineWidth);
	}

	onClickHandler = (event) => {
		const timelineData = this.props.data.timeline[timelineId];

		event.stopPropagation();
		this.props.handleClick(event, timelineData, true);
	};

	render() {
		const timelineData = this.props.data.timeline[timelineId];
		// console.log(timelineData)
		const assetsDataRefs = timelineData.children;

		return (
			<div
				className="timeline"
				ref={elem => {
					this.timelineElem = elem;
				}}
			>
				<div
					className="scroll-body"
					role="none"
					onClick={ this.onClickHandler }
					style={{ width: timelineData.width }}
				>
					<TimelineBody
						{...this.props}
						assetData={timelineData}
						assetsDataRefs={assetsDataRefs}
						id={timelineId}
						width={timelineData.width}
					/>
				</div>
			</div>
		);
	}
}

Timeline.propTypes = {
	data: shape({
		timeline: shape({ object }).isRequired
	}).isRequired,
	handleClick: func,
	updateTimelineWidth: func.isRequired
};

Timeline.defaultProps = {
	handleClick: () => {
		console.log("Vahram, Timeline scroll-body click handler hasn't been setup ");
	}
};

export default Timeline;
