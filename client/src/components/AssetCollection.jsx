import React, { Component } from "react";
import { string, arrayOf } from "prop-types";
import {connect} from "react-redux";

import Asset from "./Asset";
import shallowEqual from "../utils/shallowEqual";

import "./styles/AssetCollection.css";
import "./styles/AssetCollection-character.css";
import "./styles/AssetCollection-phase.css";

class AssetCollection extends Component {
	constructor(props) {
		super(props);
		this.state = { scrollBarsStatus: "scroll-bars-off" };
	}

	componentDidMount() {
		this.checkScrollBars();
	}

	getCollectionElem = collection => {
		this.collection = collection;
	};

	checkScrollBars = () => {
		let scrollBarsStatus;
		if (this.collection.clientWidth === this.collection.offsetWidth) {
			// console.log("scroll bars are off");
			scrollBarsStatus = "scroll-bars-off";
		} else {
			// console.log("scroll bars are on");
			scrollBarsStatus = "scroll-bars-on";
		}
		this.setState({ scrollBarsStatus });
	};

	render() {
		const { collectionAssetIds, type } = this.props;
		const styleType = type === "character" ? "character" : "phase";

		return (
			<div
				className={`asset-collection ${styleType}-collection ${this.state.scrollBarsStatus}`}
				ref={this.getCollectionElem}
			>
				<ul>
					{collectionAssetIds.map(assetId => {
						return (
							<li key={assetId}>
								<Asset assetId={assetId} />
							</li>
						);
					})}

					<li>
						<div id="add-asset">
							<div className="large-plus-icon">&#43;</div>
						</div>
					</li>
				</ul>
			</div>
		);
	}
}

AssetCollection.propTypes = {
	type: string.isRequired,
	collectionAssetIds: arrayOf(string.isRequired).isRequired,
};

AssetCollection.defaultProps = {
}

const options = {
	areStatesEqual(next, prev){
		return next.data === prev.data;
	},
	areStatePropsEqual(next, prev){
		return shallowEqual(next.collectionAssetIds, prev.collectionAssetIds)
	}
}

function mapStateToProps({data}, {type}){
	const collectionAssetIds = Object.keys(data).filter(id => data[id].type === type);

	return {
		collectionAssetIds
	}
}

export default connect(mapStateToProps, null, null, options)(AssetCollection);
// export default AssetCollection;
