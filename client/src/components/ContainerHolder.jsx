import React from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { DropTarget } from "react-dnd";
import _ from "lodash";

import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { deSelectAsset, removeAssetFromParent } from "../actions/actionCreators";
import { dndTypes } from "../utils/constants";

import "./styles/ContainerHolder.css";

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

const ContainerHolder = props => {
	// console.log("isOver :", props.isOver);
	return (
		<div>
			{props.connectDropTarget(
				// vahram, when add/edit detail functionality is done, 
				// move the main drop bg functionality from #main-drop-bg div, to .main div in App
				// otherwise, clicking/dropping between asset containers doesn't register
				<div id="main-drop-bg" role="none" onClick={props.deSelectAsset} />
			)}
			<div id="asset-containers">
				<AssetContainer type="phase" />
				<AssetContainer type="scene" />
				<AssetContainer type="character" />
			</div>
			<TimelineContainer />
		</div>
	);
};

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝

ContainerHolder.propTypes = {
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
	DropTarget(dndTypes.TIMELINE_ASSET, appTargetSpec, collectDnD)
]);

export default decorator(ContainerHolder);
