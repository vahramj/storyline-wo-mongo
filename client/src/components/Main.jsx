import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { func } from "prop-types";
import { DropTarget } from "react-dnd";
import _ from "lodash";

import ContainerHolder from "./ContainerHolder";
import DetailContainer from "./DetailContainer";

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

const Main = (props) => {
	return(
		props.connectDropTarget(
			<main role="none" onClick={props.deSelectAsset}>
				<Switch>
					<Route path="/:operation/:type/:id?" component={ DetailContainer } />
					<Route path="/" component={ ContainerHolder } />
				</Switch>
			</main>
		)
	)
}

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝

Main.propTypes = {
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
	withRouter,
	DropTarget(dndTypes.TIMELINE_ASSET, appTargetSpec, collectDnD),
	connect(null, actions),
]);


export default decorator(Main);
