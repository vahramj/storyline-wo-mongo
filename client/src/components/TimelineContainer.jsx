import React from "react";

import Timeline from "./Timeline";
import Toolbox from "./Toolbox";
import ContainerHeader from "./ContainerHeader";

import "./styles/TimelineContainer.css";

const TimelineContainer = ()=>{
	return (
		<div id="timeline-container">

			<ContainerHeader headerText="timeline" />

			<div className="container-body">
				<Toolbox />
				<Timeline />
			</div>
		</div>
	);
};

export default TimelineContainer;