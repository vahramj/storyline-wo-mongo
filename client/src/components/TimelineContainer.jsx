import React from "react";

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
			<div className="container-body">
				<Toolbox />
				<Timeline />
			</div>
		</div>
	);
};

export default TimelineContainer;