import React from "react";
import AssetContainer from "./AssetContainer";
import "./styles/App.css";

const App = ()=>{
	return (
		<div>
			<header id="main-header">
				<h1>Storyline Maker</h1>
			</header>
			<div className="container-holder">
				<AssetContainer type="phase" />
				<AssetContainer type="scene" />
				<AssetContainer type="character" />
			</div>
		</div>
	);
};

export default App;