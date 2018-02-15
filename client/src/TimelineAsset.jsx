import React, { Component } from "react";
import { arrayOf, shape, object, string } from "prop-types";

import Asset from "./Asset";
import TimelineBody from "./TimelineBody";

import "./styles/TimelineAsset.css";

const headWidth = 135;
const initialOpening = 30;
// const childWidth = 125;

function getWidth(props) {
	let assetWidth = props.data.parents[props.parentId].widthInParent;
	if (props.data.type === "scene") {
		assetWidth = "";
	} else if (!assetWidth) {
		assetWidth = headWidth + initialOpening;
	}

	return assetWidth;
}

class TimelineAsset extends Component {
	constructor(props) {
		super(props);

		this.state = {
			assetWidth: getWidth(props)
		};
	}

	render() {
		const { data } = this.props;
		return (
			<div className="timeline-asset" style={{ width: this.state.assetWidth }}>
				<div className="head">
					<Asset name={data.name} type={data.type} image={data.image} />
				</div>

				<TimelineBody data={data} />

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
	}).isRequired
};

export default TimelineAsset;
