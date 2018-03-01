import React from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { DropTarget, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { deSelectAsset, removeAssetFromParent } from "../actions/actionCreators";
import { dndTypes } from "../constants";

import "./styles/App.css";

const appTargetSpec = {
	drop(props, monitor) {
		const { assetId } = monitor.getItem();
		// console.log("drop props: ", assetId);
		// props.deSelectAsset();
		props.removeAssetFromParent(assetId);
	}
};

const collectDnD = connectDnD => {
	return {
		connectDropTarget: connectDnD.dropTarget()
	};
};

const App = props => {
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

App.propTypes = {
	deSelectAsset: func.isRequired,
	connectDropTarget: func.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		deSelectAsset() {
			dispatch(deSelectAsset());
		},
		removeAssetFromParent(assetId) {
			dispatch(removeAssetFromParent(assetId));
		}
	};
}

const DropableApp = DropTarget(dndTypes.TIMELINE_ASSET, appTargetSpec, collectDnD)(App);
const ConnectedApp = connect(null, mapDispatchToProps)(DropableApp);
const ContextApp = DragDropContext(HTML5Backend)(ConnectedApp);
export default ContextApp;

// export default DragDropContext(HTML5Backend)(
// 	connect(null, mapDispatchToProps)(
// 		DropTarget(ASSET, appTargetSpec, collectDnD)(App)
// 	)
// );
