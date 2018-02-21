import React, { Component } from "react";
import update from "immutability-helper";
import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { getData } from "../utils/appLogic";
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

		const headWidthList = {
			timeline: 0,
			phase: 135,
			scene: 135
		}
		const sourceHeadWidth = headWidthList[source.type];
		const targetHeadWidth = headWidthList[target.type];

		const initialOpeningList = {
			phase: 30,
			scene: 0
		}
		const initialOpening = initialOpeningList[source.type];

		const inBodyPosition = position - targetHeadWidth;

		const newChild = {
			id: source.id,
			type: source.type,
			width: initialOpening,
			position: inBodyPosition
		};	

		const newChildren = [...target.children];
		// vahram, find a way to update target width.
		// Probably will need to move position & width from child ref data into asset's main data


		if (newChildren.length > 0 ) {
			// console.log("hello")
			let rightNeighbourIndex;
			let leftNeighbour; 
			let leftNeighbourIndex;
			let rightNeighbour = newChildren.find((child, index) => {
				if (child.position > newChild.position) {
					rightNeighbourIndex = index;
					return true;
				}
				return false;
			});

			// has both left & right
			if(rightNeighbour && rightNeighbourIndex>0){
				leftNeighbourIndex = rightNeighbourIndex-1;
				leftNeighbour = newChildren[leftNeighbourIndex];
			}
			// has only left
			else if(!rightNeighbour) {
				leftNeighbourIndex = newChildren.length-1;
				leftNeighbour = newChildren[leftNeighbourIndex];
			}

			if(leftNeighbour){
				// console.log("has left", leftNeighbour)
				const leftNeighbourWidth = leftNeighbour.width + headWidthList[leftNeighbour.type];

				if(leftNeighbour.position + leftNeighbourWidth > newChild.position){
					const positionDiff = newChild.position - leftNeighbour.position;
					// console.log("positionDiff: ", positionDiff, 'leftNeighbourWidth/2: ', leftNeighbourWidth/2)
					if(positionDiff > leftNeighbourWidth/2){
						newChild.position = leftNeighbour.position + leftNeighbourWidth;
					}
					else {
						newChild.position = leftNeighbour.position;
						rightNeighbour = leftNeighbour;
						rightNeighbourIndex = leftNeighbourIndex;
					}
				}
			}

			if(rightNeighbour){
				const pushAmount = newChild.position + sourceHeadWidth + newChild.width - rightNeighbour.position;
				if (pushAmount > 0) {
					for (let i = rightNeighbourIndex; i < newChildren.length; i++) {
						newChildren[i] = Object.assign({}, newChildren[i], {
							position: newChildren[i].position + pushAmount
						});
					}
				}
			}

			console.log("rightNeighbourIndex: ",rightNeighbourIndex)
			newChildren.splice(rightNeighbourIndex, 0, newChild);
		} 
		else {
			newChildren.push(newChild);
		}

		const updatedData = update(this.state.data, {
			[target.type]: {
				[target.id]: {
					children: {
						$set: newChildren
					}
				}
			}
		});
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
