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
				<AssetContainer type="phases" />
				<AssetContainer type="scenes" />
				<AssetContainer type="characters" />
			</div>
		</div>
	);
};

export default App;