import React from "react";
import { number, shape, string, func } from "prop-types";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";

import "./styles/TimelineAsset.css";

const TimelineAsset = props => {
	const { assetData, selectedAssetId } = props;
	// vahram, convert selectedAssetId to just the asset id, no onTimline property needed there
	const selected = selectedAssetId && assetData.id === selectedAssetId;
	const selectedStyle = selected ? "selected" : "";
	return (
		<div
			className={`timeline-asset ${selectedStyle} timeline-${assetData.type}`}
			role="none"
			onClick={event => {
				event.stopPropagation();
				props.handleClick(event, assetData, true);
			}}
			style={{ left: assetData.position }}
		>
			<div className="head">
				<Asset assetData={assetData} decorative />
			</div>

			<TimelineBody {...props} />

			<div
				className="tail"
				style={{
					visibility: assetData.type === "scene" || !selected ? "hidden" : ""
				}}
			/>
		</div>
	);
};

TimelineAsset.propTypes = {
	assetData: shape({
		id: string.isRequired,
		type: string.isRequired,
		position: number.isRequired
	}).isRequired,
	handleClick: func,
	selectedAssetId: string
};

TimelineAsset.defaultProps = {
	handleClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selectedAssetId: null
};

export default TimelineAsset;
