import React from "react";
import { shape, arrayOf, string, number } from "prop-types";

import TimelineAsset from "./TimelineAsset";


const TimelineBody = props => {
	const { childAssets, width } = props;

	return (
		<div className="body" style={{ width }}>
			{childAssets.map( child => <TimelineAsset key={child.id} assetId={child.id} /> )}
		</div>
	);
};

TimelineBody.propTypes = {
	width: number.isRequired,
	childAssets: arrayOf(
		shape({
			id: string.isRequired,
		}).isRequired
	).isRequired
};

export default TimelineBody;
