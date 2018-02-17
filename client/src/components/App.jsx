import React, { Component } from "react";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { getData, handleSelectAsset } from "../utils/appLogic";
import "./styles/App.css";

const data = getData();
// let selectedAsset = getSelectedAsset();

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedAsset: null,
			data
		}

	}

	handleSelectAsset = (asset) => {
		this.setState({selectedAsset: asset});
		// handleSelectAsset(asset)
	}

	render(){
		// console.log("asset selected in App: ", this.state.selectedAsset);
		const propsToPass = {
			data: this.state.data,
			handleSelectAsset: this.handleSelectAsset,
			selectedAsset: this.state.selectedAsset
		}
		return (
			<div>
				<header id="main-header">
					<h1>Storyline Maker</h1>
				</header>
				<div className="container-holder">
					<div className="asset-containers">
						<AssetContainer type="phase" {...propsToPass} />
						<AssetContainer type="scene" {...propsToPass} />
						<AssetContainer type="character" {...propsToPass} />
					</div>
					<TimelineContainer {...propsToPass} />
				</div>
			</div>
		);
	}
};

export default App;

