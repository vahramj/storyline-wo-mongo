import React, { Component } from "react";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { getData } from "../utils/appLogic";
import "./styles/App.css";

const data = getData();

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedAsset: null,
			data
		}

	}

	deSelectAsset(){
		this.setState({selectedAsset: null})
	}

	selectAsset(asset){
		this.setState({selectedAsset: asset})
	}

	handleClick = (event, asset) => {
		// clientX is the click position rel to viewport
		const clickPosRelToViewport = event.clientX;
		const elemPosRelToViewport = Math.round(event.currentTarget.getBoundingClientRect().left)
		const clickPosition = clickPosRelToViewport - elemPosRelToViewport;
		console.log(
			event.currentTarget,
			"\npageX: ", event.pageX, 
			"\nboudningRect: ", elemPosRelToViewport,
			"\nrelative coordinate: ", clickPosition
		);

		if(asset){
			this.selectAsset(asset);
		}
		else {
			this.deSelectAsset();
		}

	}

	render(){
		console.log("asset selected in App: ", this.state.selectedAsset);
		const propsToPass = {
			data: this.state.data,
			handleClick: this.handleClick,
			selectedAsset: this.state.selectedAsset,
		}
		return (
			<div onClick={this.handleClick}>
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

