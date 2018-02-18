import React, { Component } from "react";
import { arrayOf, shape, object, string, func } from "prop-types";

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
		let assetWidth = this.props.data.parents[this.props.parentId].widthInParent;
		if (this.props.data.type === "scene") {
			assetWidth = "";
		} else if (!assetWidth) {
			assetWidth = headWidth + initialOpening;
		}

		return assetWidth;
	}

	render() {
		const { data } = this.props;
		const selectedStyle = this.props.data === this.props.selectedAsset ? "selected" : "";
		return (
			<div 
				className={`timeline-asset ${selectedStyle}`}
				style={{ width: this.state.assetWidth }} 
				role="none" 
				onClick={(event)=>{
					event.stopPropagation();
					this.props.handleSelectAsset(data);
					// const { classList } = event.currentTarget;
					// if( [...classList].some(className => className === "timeline-asset") ){
					// 	// event.stopPropagation();
					// }
				}}
			>
				<div className="head">
					<Asset data={data} onTimeline />
				</div>

				<TimelineBody {...this.props} data={data} />

				<div
					className="tail"
					style={{
						left: this.state.assetWidth,
						visibility: data.type === "scene" ? "hidden" : ""
					}}
				/>
			</div>
		);
	}
}

TimelineAsset.propTypes = {
	data: shape({
		id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		image: string,
		parents: object.isRequired,
		childAssets: arrayOf(object).isRequired
	}).isRequired,
	parentId: string.isRequired,
	handleSelectAsset: func,
	selectedAsset: shape()
};

TimelineAsset.defaultProps = {
	handleSelectAsset: ()=>{console.log("Vahram, TimelineAsset click handler hasn't been setup ")},
	selectedAsset: null
}

export default TimelineAsset;
