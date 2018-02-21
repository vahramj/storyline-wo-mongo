import React, { Component } from "react";
import update from "immutability-helper";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { getData, insertAssetByPosition, buildNewChildRef, removeAssetById } from "../utils/appLogic";
import "./styles/App.css";

const data = getData();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAsset: null,
			data
		};
	}

	deSelectAsset() {
		this.setState({ selectedAsset: null });
	}

	selectAsset(asset, onTimeline) {
		this.setState({ selectedAsset: { asset, onTimeline } });
	}

	insertAsset(source, target, position) {
		console.log("source: ", source, "\ntarget: ", target, "\n: ", position);

		const newChild = buildNewChildRef(source, target, position);
		const newChildren = insertAssetByPosition(newChild, [...target.children]);

		// const updatedSource = Object.assign({}, source, { parent: { id: target.id, type: target.type } });
		const updatedSource = update(source, {
			parent: {
				$set: { id: target.id, type: target.type }
			}
		});

		let updatedData = update(this.state.data, {
			[target.type]: {
				[target.id]: {
					children: {
						$set: newChildren
					}
				}
			},
			[source.type]: {
				[source.id]: {
					$set: updatedSource
				}
			}
		});

		// vahram, find a way to update target width.
		// Probably will need to move position & width from child ref data into asset's main data
		if (source.parent) {
			const sourceOldParent = this.state.data[source.parent.type][source.parent.id];
			const sourceOldSiblings = sourceOldParent.children;
			const updatedSourceOldSiblings = removeAssetById(source.id, sourceOldSiblings);

			updatedData = update(updatedData, {
				[source.parent.type]: {
					[source.parent.id]: {
						children: {
							$set: updatedSourceOldSiblings 
						}
					}
				}
			});
		}

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
		const { selectedAsset } = this.state;
		if (selectedAsset && !selectedAsset.onTimeline && onTimeline) {
			this.insertAsset(selectedAsset.asset, asset, clickPosition);
		}

		this.selectAsset(asset, onTimeline);
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
		// console.log("asset selected in App: ", this.state.selectedAsset);
		// console.log(this.state)
		const propsToPass = {
			data: this.state.data,
			handleClick: this.handleClick,
			updateTimelineWidth: this.updateTimelineWidth,
			selectedAsset: this.state.selectedAsset
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
