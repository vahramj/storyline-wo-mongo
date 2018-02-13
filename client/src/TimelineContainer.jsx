import React from "react";
// import {string} from "prop-types";

import Timeline from "./Timeline";
import Toolbox from "./Toolbox";

import "./styles/TimelineContainer.css";

const TimelineContainer = ()=>{
	return (
		<div id="timeline-container">
		
			<header>
				<div className="h2Wrapper">
					<h2>{`timeline`.toUpperCase()}</h2>
				</div>
			</header>
			<div id="work-area">
				<Toolbox />
				<Timeline />
			</div>
		</div>
	);
};

TimelineContainer.propTypes = {
	// type: string.isRequired
};

export default TimelineContainer;