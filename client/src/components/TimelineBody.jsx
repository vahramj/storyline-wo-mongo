import React from "react";
import { shape, arrayOf, string, number } from "prop-types";

import TimelineAsset from "./TimelineAsset";

const TimelineBody = props => {
	const { data, assetsDataRefs } = props;

	function renderChild(assetDataRef) {
		const { id, type, position, width } = assetDataRef;
		const assetData = data[type][id];
		return (
			<div key={id} style={{ position: "absolute", left: position }}>
				<TimelineAsset {...props} assetData={assetData} width={width} />
			</div>
		);
	}

	return <div className="body">{assetsDataRefs.map(renderChild)}</div>;
};

TimelineBody.propTypes = {
	assetsDataRefs: arrayOf(
		shape({
			id: string.isRequired,
			type: string.isRequired,
			position: number.isRequired,
			width: number.isRequired
		})
	).isRequired,
	data: shape().isRequired
};

export default TimelineBody;
