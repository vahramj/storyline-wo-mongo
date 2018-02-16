import React from "react";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { getData } from "../utils/appLogic";
import "./styles/App.css";

const data = getData();

const App = ()=>{
	return (
		<div>
			<header id="main-header">
				<h1>Storyline Maker</h1>
			</header>
			<div className="container-holder">
				<div className="asset-containers">
					<AssetContainer type="phase" data={data.phase} />
					<AssetContainer type="scene" data={data.phase} />
					<AssetContainer type="character" data={data.character} />
				</div>
				<TimelineContainer data={data}/>
			</div>
		</div>
	);
};

export default App;

