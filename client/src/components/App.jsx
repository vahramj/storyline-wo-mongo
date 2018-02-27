import React from "react";
import { connect } from "react-redux";
import {func} from "prop-types";

import AssetContainer from "./AssetContainer";
import TimelineContainer from "./TimelineContainer";
import { deSelectAsset } from "../actions/actionCreators";

import "./styles/App.css";

const App = (props) => {
	return (
		<div role="none" onClick={props.deSelectAsset}>
			<header id="main-header">
				<h1>Storyline Maker</h1>
			</header>
			<div className="container-holder">
				<div className="asset-containers">
					<AssetContainer type="phase" />
					<AssetContainer type="scene" />
					<AssetContainer type="character" />
				</div>
				<TimelineContainer />
			</div>
		</div>
	);
}

App.propTypes = {
	deSelectAsset: func.isRequired
}

function mapDispatchToProps(dispatch){
	return {
		deSelectAsset(){
			dispatch(deSelectAsset());
		}
	};
}

export default connect(null, mapDispatchToProps)(App);
