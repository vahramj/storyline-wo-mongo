import React from "react";
import { connect } from "react-redux";
import { arrayOf, shape, number, string, func, bool } from "prop-types";

import AssetBase from "../AssetBase";
import TimelineAssetBody from "./TimelineAssetBody";
import TimelineAssetTail from "./TimelineAssetTail";

import "../styles/TimelineAsset/TimelineAssetBase.css";

const TimelineAssetBase = props => {
	const {childAssets, width, insertPosition, type} = props;

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

TimelineAssetBase.propTypes = {
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
	getOwnerElem: func.isRequired
};

TimelineAssetBase.defaultProps = {
	insertPosition: null,
	selected: false
};

function mapStateToProps({ data }, { assetId }) {
	const { type, width, children } = data[assetId];

	return {
		type,
		width,
		childAssets: children
	};
}

export default connect(mapStateToProps)(TimelineAssetBase);
