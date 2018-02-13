import React from "react";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import "./styles/App.css";

const App = ()=>{
	return (
		<div>
			<header id="main-header">
				<h1>Storyline Maker</h1>
			</header>
			<div className="container-holder">
				<div className="asset-containers">
					<AssetContainer type="phase" />
					<AssetContainer type="scene" />
					<AssetContainer type="character" />
				</div>
				<TimelineContainer />
			</div>
		</div>
	);
};

export default App;