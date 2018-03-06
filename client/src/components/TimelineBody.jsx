import React from "react";
import { shape, arrayOf, string, number } from "prop-types";

import TimelineAsset from "./TimelineAsset";


const TimelineBody = props => {
	const { childAssets, width, insertPosition } = props;
	// console.log("insertPosition: ", insertPosition, "childAssets: ", childAssets);
	let insertPositionStyle = { display: "none" };
	if (insertPosition !== null) {
		insertPositionStyle = {
			left: insertPosition - 3,
			display: "block"
		};
	}
	// console.log(insertPositionStyle);

	return (
		<div className="body" style={{ width }}>
			<div className="insert-indicator" style={insertPositionStyle} />
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
	).isRequired,
	insertPosition: number
};

TimelineBody.defaultProps = {
	insertPosition: null
}

export default TimelineBody;
