import React from "react";
import { number, bool, string, func, arrayOf, shape } from "prop-types";
import {connect} from "react-redux";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";
import {handleTimelineClick} from "../actions/actionCreators";

import "./styles/TimelineAsset.css";

const TimelineAsset = props => {
	const { selected, assetId, type, position, width, childAssets } = props;
	const selectedStyle = selected ? "selected" : "";
	return (
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

			<TimelineBody childAssets={ childAssets } width={ width } />

			<div
				className="tail"
				style={{
					visibility: type === "scene" || !selected ? "hidden" : ""
				}}
			/>
		</div>
	);
};

TimelineAsset.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	position: number.isRequired,
	width: number.isRequired,
	handleTimelineClick: func,
	selected: bool,
	childAssets: arrayOf(
		shape({
			id:string
		})
	).isRequired
};

TimelineAsset.defaultProps = {	
	handleTimelineClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selected: false
};

function mapDispatchToProps(dispatch){
	return {
		handleTimelineClick(event, assetData){
			return dispatch(handleTimelineClick(event, assetData));
		}
	};
}

function mapStateToProps({ data, selectedAssetId }, { assetId }){
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

export default connect(mapStateToProps, mapDispatchToProps)(TimelineAsset);
// export default TimelineAsset;
