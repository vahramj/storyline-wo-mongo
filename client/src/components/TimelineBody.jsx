import React from "react";
import { shape, object, arrayOf, string } from "prop-types";

import TimelineAsset from "./TimelineAsset";

const TimelineBody = (props) => {
	const {data, childAssetsIds, id} = props;

	// vahram, later, do convert assets in app data from arrays to objects w/ id as key
	const childAssetsData = childAssetsIds.map( childAsset =>  {
		const fullAsset = data[childAsset.type].find(asset => asset.id === childAsset.id);
		// console.log( fullAsset )
		return fullAsset 
	});

	function renderChild(assetData, parentId) {
		const { positionInParent } = assetData.parents[parentId];
		return (
			<div key={assetData.id} style={{ position: "absolute", left: positionInParent.x }}>
				{
					<TimelineAsset {...props} assetData={assetData} parentId={parentId} />
				}
			</div>
		);
	}

	return (
		<div className="body">
			{
				childAssetsData.map( childAssetData => renderChild(childAssetData, id) )
			}
		</div>
	);
}

TimelineBody.propTypes = {
	id: string.isRequired,
	childAssetsIds: arrayOf(shape({
		id: string.isRequired,
		type: string.isRequired
	})).isRequired,
	data: shape({}).isRequired,
	// timelineAssetType: string.isRequired
}

export default TimelineBody;