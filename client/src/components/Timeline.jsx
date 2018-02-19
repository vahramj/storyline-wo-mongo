import React from "react";
import { shape, object } from "prop-types";

import TimelineBody from "./TimelineBody";

import "./styles/Timeline.css";

const Timeline = props => {

	const timelineId = "tmln_01";
	const childAssetsIds = props.data.timeline[timelineId].children;
	// console.log(props.data)
	return (
		<div className="timeline">
			<TimelineBody {...props} childAssetsIds={childAssetsIds} id={timelineId} />
		</div>
	);
};

Timeline.propTypes = {
	data: shape({
		timeline: shape({object}).isRequired,
		// phase: shape({object}).isRequired,
		// character: shape({object}).isRequired
	}).isRequired
};

export default Timeline;

