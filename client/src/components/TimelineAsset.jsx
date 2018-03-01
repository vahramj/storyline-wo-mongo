import React from "react";
import { number, bool, string, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";
import { handleTimelineClick } from "../actions/actionCreators";
import { dndTypes } from "../constants";

import "./styles/TimelineAsset.css";


// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║   
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║   
// ██║  ██║███████╗██║  ██║╚██████╗   ██║   
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   
const TimelineAsset = props => {
	const { selected, assetId, type, position, width, childAssets, connectDragSource } = props;

	const selectedStyle = selected ? "selected" : "";
	return connectDragSource(
		<div
			className={`timeline-asset ${selectedStyle} timeline-${type}`}
			role="none"
			onClick={event => {
				event.stopPropagation();
				props.handleTimelineClick(event, assetId);
			}}
			style={{ left: position }}
		>
			<div className="head">
				<Asset assetId={assetId} decorative />
			</div>

			<TimelineBody childAssets={childAssets} width={width} />

			<div
				className="tail"
				style={{
					visibility: type === "scene" || !selected ? "hidden" : ""
				}}
			/>
		</div>
	);
};

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝

TimelineAsset.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	position: number.isRequired,
	width: number.isRequired,
	handleTimelineClick: func,
	selected: bool,
	childAssets: arrayOf(
		shape({
			id: string
		})
	).isRequired
};

TimelineAsset.defaultProps = {
	handleTimelineClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selected: false
};

// ██████╗ ███████╗ █████╗  ██████╗████████╗    ██████╗ ███╗   ██╗██████╗ 
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██╔══██╗████╗  ██║██╔══██╗
// ██████╔╝█████╗  ███████║██║        ██║       ██║  ██║██╔██╗ ██║██║  ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║       ██║  ██║██║╚██╗██║██║  ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║       ██████╔╝██║ ╚████║██████╔╝
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝       ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
const TimelineAssetSourceSpec = {
	beginDrag(props) {
		const { assetId } = props;
		// console.log("beginDrag: ", assetId);
		return { assetId };
	}
};

const collectDnD = connectDnD => {
	return {
		connectDragSource: connectDnD.dragSource()
	};
};

// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗     ██████╗ ██████╗ ███╗   ██╗███╗   ██╗███████╗ ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝    ██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝     ██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║        ██║   
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗     ██║     ██║   ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║        ██║   
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗    ╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║███████╗╚██████╗   ██║   
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═╝   
function mapDispatchToProps(dispatch) {
	return {
		handleTimelineClick(event, assetData) {
			return dispatch(handleTimelineClick(event, assetData));
		}
	};
}

function mapStateToProps({ data, selectedAssetId }, { assetId }) {
	const { type, position, width, children } = data[assetId];

	const selected = selectedAssetId && assetId === selectedAssetId;
	return {
		selected,
		type,
		position,
		width,
		childAssets: children
	};
}

const dragableTimelineAsset = DragSource(
	dndTypes.TIMELINE_ASSET,
	TimelineAssetSourceSpec,
	collectDnD
)(TimelineAsset);
const connectedTimelineAsset = connect(mapStateToProps, mapDispatchToProps)(dragableTimelineAsset);

export default connectedTimelineAsset;
// export default TimelineAsset;
