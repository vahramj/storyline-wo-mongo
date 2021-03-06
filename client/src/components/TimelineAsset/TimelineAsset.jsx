import React from "react";
import { connect } from "react-redux";
import { arrayOf, shape, number, string, func, bool } from "prop-types";

import AssetBase from "../AssetBase";
import TimelineAssetBody from "./TimelineAssetBody";
import TimelineAssetTail from "./TimelineAssetTail";

import "./styles/TimelineAsset.css";

const TimelineAsset = props => {
	const {childAssets, width, insertPosition, type} = props;
	// console.log("rendering timeline asset")
	function renderHead(){
		const { assetId } = props;
		let headElem = (
			<div className="head">
				<AssetBase assetId={assetId} />
			</div>
		);

		if (type === "timeline") {
			headElem = null;
		}

		return headElem;
	};

	function renderTail() {
		const { selected, assetId, getOwnerElem } = props;
		
		let tailElem = (
			<TimelineAssetTail
				type={type}
				selected={selected}
				ownerId={assetId}
				getOwnerElem={getOwnerElem}
			/>
		);

		if (type === "timeline") {
			tailElem = null;
		}

		return tailElem;
	};

	return (
		<div className={`timeline-asset-base timeline-${type}`}>		
			{renderHead()}

			<TimelineAssetBody
				childAssets={childAssets}
				width={width}
				insertPosition={insertPosition}
			/>

			{renderTail()}
		</div>
	);
};

TimelineAsset.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	width: number.isRequired,
	selected: bool,
	childAssets: arrayOf(
		shape({
			id: string.isRequired
		})
	).isRequired,
	insertPosition: number,
	getOwnerElem: func,
};

TimelineAsset.defaultProps = {
	insertPosition: null,
	selected: false,
	getOwnerElem(){console.log("vahram, getOwnerElem is not passed in")},
};

function mapStateToProps({ assetsData }, { assetId }) {
	const { data } = assetsData;

	const { type, width, children } = data[assetId];

	return {
		type,
		width,
		childAssets: children
	};
}

export default connect(mapStateToProps)(TimelineAsset);
