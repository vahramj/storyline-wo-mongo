import React from "react";

import Thumbnail from "./Thumbnail";
import "./styles/TimelineAsset.css";

const TimelineAsset = () => {
	return (
		<div className="timeline-asset">
			<div className="header">
				<Thumbnail name="Some timeline phase" type="phase" />
			</div>
			<div className="body">body</div>
		</div>
	);
}

export default TimelineAsset;