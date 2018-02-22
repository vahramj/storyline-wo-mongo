import React, { Component } from "react";
import { shape, func } from "prop-types";

import TimelineBody from "./TimelineBody";

import "./styles/Timeline.css";

const timelineId = "tmln_01";

class Timeline extends Component {
	componentDidMount() {
		this.setDefaultWidth();
		window.addEventListener("resize", this.setDefaultWidth)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.setDefaultWidth)
	}

	onClickHandler = (event) => {
		const timelineData = this.props.data[timelineId];

		event.stopPropagation();
		this.props.handleClick(event, timelineData, true);
	};

	setDefaultWidth = () => {
		const timelineData = this.props.data[timelineId];

		if(timelineData.defaultWidth){
			const timelineFrameWidth = this.timelineElem.getBoundingClientRect().width;
			this.props.updateTimelineWidth(timelineFrameWidth, timelineId)
		}		
	}

	render() {
		const timelineData = this.props.data[timelineId];

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
					/>
				</div>
			</div>
		);
	}
}

Timeline.propTypes = {
	data: shape(
	// {
	// 	timeline: shape().isRequired
	// }
	).isRequired,
	handleClick: func,
	updateTimelineWidth: func.isRequired
};

Timeline.defaultProps = {
	handleClick: () => {
		console.log("Vahram, Timeline scroll-body click handler hasn't been setup ");
	}
};

export default Timeline;
