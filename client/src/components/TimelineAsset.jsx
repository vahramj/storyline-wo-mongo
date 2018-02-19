import React, { Component } from "react";
import { arrayOf, number, shape, object, string, func } from "prop-types";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";

import "./styles/TimelineAsset.css";

const headWidth = 135;
const initialOpening = 30;
// const childWidth = 125;

class TimelineAsset extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assetWidth: this.getAssetWidth()
		};
	}

	getAssetWidth() {
		let assetWidth = this.props.width;
		if (this.props.assetData.type === "scene") {
			assetWidth = "";
		} else if (assetWidth === 0) {
			assetWidth = headWidth + initialOpening;
		}

		return assetWidth;
	}

	render() {
		const { assetData, selectedAsset } = this.props;
		const selectedStyle = selectedAsset && assetData.id === selectedAsset.id ? "selected" : "";
		return (
			<div
				className={`timeline-asset ${selectedStyle}`}
				style={{ width: this.state.assetWidth }}
				role="none"
				onClick={event => {
					event.stopPropagation();
					this.props.handleSelectAsset(assetData);
				}}
			>
				<div className="head">
					<Asset assetData={assetData} onTimeline />
				</div>

				<TimelineBody {...this.props} assetsDataRefs={assetData.children} />

				<div
					className="tail"
					style={{
						left: this.state.assetWidth,
						visibility: assetData.type === "scene" ? "hidden" : ""
					}}
				/>
			</div>
		);
	}
}

TimelineAsset.propTypes = {
	width: number.isRequired,
	assetData: shape({
		id: string.isRequired,
		type: string.isRequired,
		children: arrayOf(object).isRequired
	}).isRequired,
	handleSelectAsset: func,
	selectedAsset: shape()
};

TimelineAsset.defaultProps = {
	handleSelectAsset: () => {
		console.log("Vahram, TimelineAsset click handler hasn't been setup ");
	},
	selectedAsset: null
};

export default TimelineAsset;
