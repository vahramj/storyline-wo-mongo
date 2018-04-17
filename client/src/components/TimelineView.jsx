import React from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { DropTarget } from "react-dnd";
import _ from "lodash";

import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";

import "./styles/TimelineView.css";

import { deSelectAsset, removeAssetFromParent } from "../actions/actionCreators";
import { dndTypes } from "../utils/constants";


// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const appTargetSpec = {
	drop(props, monitor) {
		if (monitor.didDrop()) {
			return;
		}
		const { assetId } = monitor.getItem();
		// console.log("drop props: ", assetId);
		console.log("props.removeAssetFromParent: ", props.removeAssetFromParent);
		// props.deSelectAsset();
		props.removeAssetFromParent(assetId);
	}
};

const collectDnD = (connectDnD, monitor) => {
	return {
		connectDropTarget: connectDnD.dropTarget(),
		isOver: monitor.isOver()
	};
};

// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝

const TimelineView = (props) => {
	// console.log("isOver :", props.isOver);
	return (
		props.connectDropTarget(
			<div className="main" role="none" onClick={props.deSelectAsset}>
				<div id="asset-containers">
					<AssetContainer type="phase" />
					<AssetContainer type="scene" />
					<AssetContainer type="character" />
				</div>
				<TimelineContainer />
			</div>
		)
	);
};

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝

TimelineView.propTypes = {
	deSelectAsset: func.isRequired,
	connectDropTarget: func.isRequired,
	removeAssetFromParent: func.isRequired
};

// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
const actions = { deSelectAsset, removeAssetFromParent };

const decorator = _.flowRight([
	connect(null, actions),
	DropTarget(dndTypes.TIMELINE_ASSET, appTargetSpec, collectDnD),
]);


export default decorator(TimelineView);

