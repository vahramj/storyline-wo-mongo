import React from "react";
import { shape, arrayOf, string, number } from "prop-types";

import TimelineAsset from "./TimelineAsset";


const TimelineBody = props => {
	const { data, assetData: {children, width} } = props;

	function renderChild(childRef) {
		const { id, type } = childRef;
		const childAssetData = data[type][id];
		return <TimelineAsset key={id} {...props} assetData={childAssetData} /> ;
	}

	return (
		<div className="body" style={{ width }}>
			{children.map(renderChild)}
		</div>
	);
};

TimelineBody.propTypes = {
	assetData: shape({
			width: number.isRequired,
			children: arrayOf(shape({
				id: string.isRequired,
				type: string.isRequired
			})).isRequired
		}).isRequired,
	data: shape().isRequired,
};

export default TimelineBody;
