import React from "react";
import { shape, object, arrayOf, string } from "prop-types";

import TimelineAsset from "./TimelineAsset";

function renderChild(childData, parentId) {
	const { positionInParent, widthInParent } = childData.parents[parentId];

	return (
		<div key={childData.id} style={{ position: "absolute", width: widthInParent, left: positionInParent.x }}>
			<TimelineAsset data={childData} parentId={parentId} />
		</div>
	);
}

const TimelineBody = (props) => {
	const {data} = props;

	const relevantChildAssets = data.childAssets.filter(childData => {
		return data.id in childData.parents;
	})

	return (
		<div className="body">
			{relevantChildAssets.map( childData => renderChild(childData, data.id) )}
		</div>
	);
}

TimelineBody.propTypes = {
	data: shape({
		id: string.isRequired,
		childAssets: arrayOf(object).isRequired
	}).isRequired
}

export default TimelineBody;