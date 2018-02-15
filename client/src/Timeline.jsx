import React from "react";
import { arrayOf, shape, object } from "prop-types";

// import TimelineAsset from "./TimelineAsset";
import { renderChildren } from "./TimelineUtils";
import "./styles/Timeline.css";

// let assetData;

const Timeline = props => {
	const onTimelineAssetes = props.data.phase.filter(phase => {
		return "timeline" in phase.parents;
	})
	// console.log(onTimelineAssetes);
	return (
		<div className="timeline">
			{
				renderChildren({childAssets: onTimelineAssetes, id: "timeline"})
			}
			{/* <TimelineAsset data={assetData} parentId="timeline" /> */}
		</div>
	);
};

Timeline.propTypes = {
	data: shape({
		phase: arrayOf(object).isRequired,
		character: arrayOf(object).isRequired
	}).isRequired
};

export default Timeline;

// assetData = {
// 	id: "phs_01",
// 	name: "Some phase name",
// 	type: "phase",
// 	image: "",
// 	parents: {
// 		timeline: {
// 			widthInParent: 0,
// 			positionInParent: {
// 				x: 0,
// 				y: 0,
// 			}
// 		}
// 	},
// 	childAssets: [
// 		// {
// 		// 	id: "scn_01",
// 		// 	name: "scene for timeline asset",
// 		// 	type: "scene",
// 		// 	image: "./static/images/phase_thumbnails/saving Minas Tirith_thumb.png",
// 		// 	parents: {
// 		// 		"phs_01": {
// 		// 			widthInParent: 0,
// 		// 			positionInParent: {
// 		// 				x: 15,
// 		// 				y: 0,
// 		// 			}
// 		// 		}
// 		// 	},
// 		// 	childAssets: []
// 		// },
// 		// {
// 		// 	id: "scn_02",
// 		// 	name: "scene 02",
// 		// 	type: "scene",
// 		// 	image: "./static/images/phase_thumbnails/gorlum's journey_thumb.png",
// 		// 	parents: {
// 		// 		"phs_01": {
// 		// 			widthInParent: 0,
// 		// 			positionInParent: {
// 		// 				x: 145,
// 		// 				y: 0,
// 		// 			}
// 		// 		}
// 		// 	},
// 		// 	childAssets: []
// 		// }
// 	]
// };
