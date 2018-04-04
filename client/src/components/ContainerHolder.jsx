import React from "react";

import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";

import "./styles/ContainerHolder.css";

const ContainerHolder = () => {
	// console.log("isOver :", props.isOver);
	return (
		<div>
			<div id="asset-containers">
				<AssetContainer type="phase" />
				<AssetContainer type="scene" />
				<AssetContainer type="character" />
			</div>
			<TimelineContainer />
		</div>
	);
};

export default ContainerHolder;

