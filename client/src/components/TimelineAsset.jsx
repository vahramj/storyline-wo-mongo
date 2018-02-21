import React from "react";
import { arrayOf, number, shape, object, string, func } from "prop-types";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";

import "./styles/TimelineAsset.css";

const TimelineAsset = props => {

	const { assetData, selectedAsset } = props;
	const selectedStyle = selectedAsset && assetData.id === selectedAsset.asset.id ? "selected" : "";
	return (
		<div
			className={`timeline-asset ${selectedStyle} timeline-${assetData.type}`}
			role="none"
			onClick={event => {
				event.stopPropagation();
				props.handleClick(event, assetData, true);
			}}
		>
			<div className="head">
				<Asset assetData={assetData} onTimeline />
			</div>

			<TimelineBody {...props} assetsDataRefs={assetData.children} />

			<div
				className="tail"
				style={{
					// left: this.state.assetWidth,
					visibility: assetData.type === "scene" ? "hidden" : ""
				}}
			/>
		</div>
	);
}

TimelineAsset.propTypes = {
	// width: number.isRequired,
	assetData: shape({
		id: string.isRequired,
		type: string.isRequired,
		children: arrayOf(object).isRequired
	}).isRequired,
	handleClick: func,
	selectedAsset: shape()
};

TimelineAsset.defaultProps = {
	handleClick: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selectedAsset: null
};

export default TimelineAsset;
