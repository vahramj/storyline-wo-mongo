import React from "react";
import { arrayOf, shape, object } from "prop-types";

import TimelineBody from "./TimelineBody";

import "./styles/Timeline.css";

const Timeline = props => {

	const childAssetsIds = props.data.timeline[0].children;

	return (
		<div className="timeline">
			<TimelineBody {...props} childAssetsIds = {childAssetsIds} id="timeline" />
		</div>
	);
};

Timeline.propTypes = {
	data: shape({
		phase: arrayOf(object).isRequired,
		// character: arrayOf(object).isRequired
	}).isRequired
};

export default Timeline;

