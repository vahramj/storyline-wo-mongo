import React from "react";

import TimelineAsset from "./TimelineAsset";
import "./styles/Timeline.css";

let assetData;

const Timeline = () => {
	return (
		<div className="timeline">
			<TimelineAsset data={assetData} parentId="timeline" />
		</div>
	);
};

export default Timeline;

assetData = {
	id: "phs_01",
	name: "Some phase name",
	type: "phase",
	image: "",
	parents: {
		timeline: {
			widthInParent: 0,
			positionInParent: {
				x: 0,
				y: 0,
			}
		}
	},
	childAssets: [
		// {
		// 	id: "scn_01",
		// 	name: "scene for timeline asset",
		// 	type: "scene",
		// 	image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png",
		// 	parents: {
		// 		"phs_01": {
		// 			widthInParent: 0,
		// 			positionInParent: {
		// 				x: 15,
		// 				y: 0,
		// 			}
		// 		}
		// 	},
		// 	childAssets: []
		// },
		// {
		// 	id: "scn_02",
		// 	name: "scene 02",
		// 	type: "scene",
		// 	image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png",
		// 	parents: {
		// 		"phs_01": {
		// 			widthInParent: 0,
		// 			positionInParent: {
		// 				x: 145,
		// 				y: 0,
		// 			}
		// 		}
		// 	},
		// 	childAssets: []
		// }
	]
};
