import React from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { DropTarget, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import _ from "lodash";

import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { deSelectAsset, removeAssetFromParent } from "../actions/actionCreators";
import { dndTypes } from "../constants";

import "./styles/App.css";


// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║   
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║   
// ██║  ██║███████╗██║  ██║╚██████╗   ██║   
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   

const App = props => {
	// console.log("isOver :", props.isOver);
	// console.log("isOverShallow :", props.isOverShallow);
	return (
		<div>
			<header id="main-header">
				<h1>Storyline Maker</h1>
			</header>
			{props.connectDropTarget(
				<div className="container-holder" role="none" onClick={props.deSelectAsset}>
					<div className="asset-containers">
						<AssetContainer type="phase" />
						<AssetContainer type="scene" />
						<AssetContainer type="character" />
					</div>
					<TimelineContainer />
				</div>
			)}
		</div>
	);
};

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝

App.propTypes = {
	deSelectAsset: func.isRequired,
	connectDropTarget: func.isRequired
};

// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const appTargetSpec = {
	drop(props, monitor) {

		if(monitor.didDrop()){
			return	
		}
		const { assetId } = monitor.getItem();
		// console.log("drop props: ", assetId);
		// props.deSelectAsset();
		props.removeAssetFromParent(assetId);
	}
};

const collectDnD = (connectDnD, monitor) => {
	return {
		connectDropTarget: connectDnD.dropTarget(),
		isOver: monitor.isOver(),
		isOverShallow: monitor.isOver({shallow: true})
	};
};

// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝ 
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗ 
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
const actions = {deSelectAsset, removeAssetFromParent};

const decorator = _.flowRight([
	DragDropContext(HTML5Backend),
	connect(null, actions),
	DropTarget(dndTypes.TIMELINE_ASSET, appTargetSpec, collectDnD),
]);
export default decorator(App);

