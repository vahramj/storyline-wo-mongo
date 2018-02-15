import React from "react";
import TimelineAsset from "./TimelineAsset";

export function renderChildren(data) {
	
	function renderChild(childData) {
		const { positionInParent, widthInParent } = childData.parents[data.id];

		return (
			<div key={childData.id} style={{ position: "absolute", width: widthInParent, left: positionInParent.x }}>
				<TimelineAsset data={childData} parentId={data.id} />
			</div>
		);
	}

	return data.childAssets.map(renderChild);
}