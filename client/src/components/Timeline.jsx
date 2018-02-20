import React from "react";
import { shape, object } from "prop-types";

import TimelineBody from "./TimelineBody";

import "./styles/Timeline.css";

const Timeline = props => {
	const timelineId = "tmln_01";
	const timelineData = props.data.timeline[timelineId];
	const assetsDataRefs = timelineData.children;
	// console.log(props.data)
	return (
		<div className="timeline">
			<div
				className="scroll-body"
				role="none"
				onClick={event => {
					event.stopPropagation();
					props.handleClick(event, timelineData, true);
				}}
			>
				<TimelineBody {...props} assetData={timelineData} assetsDataRefs={assetsDataRefs} id={timelineId} />
			</div>
		</div>
	);
};

Timeline.propTypes = {
	data: shape({
		timeline: shape({ object }).isRequired
	}).isRequired
};

export default Timeline;
