import React from "react";
import { shape, arrayOf, string, number } from "prop-types";

import TimelineAsset from "./TimelineAsset";

// const headWidth = 135;
const initialOpening = 30;

const TimelineBody = props => {
	// vahram, come back and rename assetsDataRefs to childAssets, maybe even get it from assetData
	const { data, assetsDataRefs } = props;

	function getBodyWidth() {
		let assetWidth = props.width;

		if (props.assetData.type === "scene") {
			assetWidth = "";
		} else if (assetWidth === 0) {
			assetWidth = initialOpening;
		}

		return assetWidth;
	}

	function renderChild(assetDataRef) {
		const { id, type, position, width } = assetDataRef;
		const assetData = data[type][id];
		return (
			<div key={id} style={{ position: "absolute", left: position }}>
				<TimelineAsset {...props} assetData={assetData} width={width} />
			</div>
		);
	}

	return (
		<div className="body" style={{ width: getBodyWidth() }}>
			{assetsDataRefs.map(renderChild)}
		</div>
	);
};

TimelineBody.propTypes = {
	width: number.isRequired,
	assetsDataRefs: arrayOf(
		shape({
			id: string.isRequired,
			type: string.isRequired,
			position: number.isRequired,
			width: number.isRequired
		})
	).isRequired,
	assetData: shape().isRequired,
	data: shape().isRequired,
	// width: number.isRequired
};

export default TimelineBody;
