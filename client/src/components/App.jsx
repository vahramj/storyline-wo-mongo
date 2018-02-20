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
		this.setState({selectedAsset: null});
	}

	selectAsset(asset, onTimeline){
		this.setState({selectedAsset: {asset, onTimeline}});
	}

	insertAsset(source, target, position){
		console.log("source: ", source, "\ntarget: ", target, "\n: ", position);

		const headWidth = 135;
		const inBodyPosition = target.type === "timeline" ? position : position - headWidth;
		
		const newChild = {
			id: source.id, 
			type: source.type, 
			width: 0, 
			position: inBodyPosition
		};

		// this.state.data[target.type][target.id].children.push(newChild)

		const newChildren = [...target.children]
		newChildren.push(newChild);

		const updatedTarget = Object.assign({}, target, {children: newChildren});

		const updatedTypeGroup = Object.assign({}, this.state.data[target.type], {[target.id]:updatedTarget});

		const updatedData = Object.assign({}, this.state.data, {[target.type]:updatedTypeGroup});

		this.setState({data: updatedData});
	}

	handleClick = (event, asset, onTimeline) => {

		if(!asset){
			this.deSelectAsset();
			return;
		}


			const clickPosRelToViewport = event.clientX;
			const elemPosRelToViewport = Math.round(event.currentTarget.getBoundingClientRect().left)
			const clickPosition = clickPosRelToViewport - elemPosRelToViewport;
			
			console.log(
				event.currentTarget,
				"\npageX: ", event.pageX, 
				"\nboudningRect: ", elemPosRelToViewport,
				"\nrelative coordinate: ", clickPosition
			);
		const {selectedAsset} = this.state;
		if(selectedAsset && !selectedAsset.onTimeline && onTimeline){
			this.insertAsset(selectedAsset.asset, asset, clickPosition);
		}

		this.selectAsset(asset, onTimeline);

	}

	render(){
		// console.log("asset selected in App: ", this.state.selectedAsset);
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

