import React from "react";
import { shape, arrayOf, string, number } from "prop-types";

import TimelineAssetRedux from "./TimelineAssetRedux";

import "./styles/TimelineAssetBody.css";

const TimelineAssetBody = props => {
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
			{childAssets.map( child => <TimelineAssetRedux key={child.id} assetId={child.id} /> )}
		</div>
	);
};

TimelineAssetBody.propTypes = {
	width: number.isRequired,
	childAssets: arrayOf(
		shape({
			id: string.isRequired,
		}).isRequired
	).isRequired,
	insertPosition: number
};

TimelineAssetBody.defaultProps = {
	insertPosition: null
}

export default TimelineAssetBody;
