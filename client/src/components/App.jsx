import React, { Component } from "react";
import update from "immutability-helper";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import {
	getData,
	// insertAssetIntoSiblings,
	setInitialAssetPosition,
	// removeAssetById,
	isInsertLegal,
	removeAssetFromItsParent,
	insertAssetIntoParent,
	resizeAssetToFitTimeline
} from "../utils/appLogic";
import "./styles/App.css";

const data = getData();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAssetId: null,
			data
		};
	}

	deSelectAsset() {
		this.setState({ selectedAssetId: null });
	}

	selectAsset(asset) {
		// const latestAsset = this.state.data[asset.type][asset.id]
		this.setState({ selectedAssetId: asset.id });
	}

	insertAsset(source, target, position) {
		console.log("source: ", source, "\ntarget: ", target, "\n: ", position);

		const legalCheck = isInsertLegal(source.type, target.type);
		if (!legalCheck.result) {
			// alert(legalCheck.message);
			return;
		}

		let updatedData = this.state.data;

		if (source.parent) {
			updatedData = removeAssetFromItsParent(source.id, updatedData);
		}

		const initiallyPositionedAsset = setInitialAssetPosition(source, position);

		updatedData = insertAssetIntoParent(initiallyPositionedAsset, target.id, updatedData);

		updatedData = resizeAssetToFitTimeline(updatedData[source.id].parent.id, updatedData);
		// console.log(updatedData)


		// vahram, find a way to update target width.
		// Probably will need to move position & width from child ref data into asset's main data

		this.setState({ data: updatedData });
	}

	handleClick = (event, asset, onTimeline) => {
		if (!asset) {
			this.deSelectAsset();
			return;
		}

		const clickPosRelToViewport = event.clientX;
		const elemPosRelToViewport = Math.round(event.currentTarget.getBoundingClientRect().left);
		const clickPosition = clickPosRelToViewport - elemPosRelToViewport;

		// console.log(
		// 	event.currentTarget,
		// 	"\npageX: ", event.pageX,
		// 	"\nboudningRect: ", elemPosRelToViewport,
		// 	"\nrelative coordinate: ", clickPosition
		// );
		const { selectedAssetId } = this.state;
		// console.log(selectedAssetId);

		if (selectedAssetId && asset.id !== selectedAssetId && onTimeline) {
			const selectedAsset = this.state.data[selectedAssetId];
			this.insertAsset(selectedAsset, asset, clickPosition);
			return;
		}

		this.selectAsset(asset);
	};

	updateTimelineWidth = (timelineWidth, timelineId) => {
		const updatedData = update(this.state.data, {
			timeline: {
				[timelineId]: {
					width: { $set: timelineWidth }
				}
			}
		});

		this.setState({ data: updatedData });
	};

	render() {
		// console.log("asset selected in App: ", this.state.selectedAssetId);
		// console.log(this.state)
		const propsToPass = {
			data: this.state.data,
			handleClick: this.handleClick,
			updateTimelineWidth: this.updateTimelineWidth,
			selectedAssetId: this.state.selectedAssetId
		};
		return (
			<div role="none" onClick={this.handleClick}>
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
}

export default App;
