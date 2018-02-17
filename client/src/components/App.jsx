import React from "react";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { getData, handleSelectAsset } from "../utils/appLogic";
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
					<AssetContainer type="phase" data={data} handleSelectAsset={handleSelectAsset} />
					<AssetContainer type="scene" data={data} handleSelectAsset={handleSelectAsset} />
					<AssetContainer type="character" data={data} handleSelectAsset={handleSelectAsset} />
				</div>
				<TimelineContainer data={data} handleSelectAsset={handleSelectAsset} />
			</div>
		</div>
	);
};

export default App;

