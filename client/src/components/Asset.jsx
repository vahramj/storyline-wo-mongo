import React, { Component } from "react";
import { shape, bool, string, func } from "prop-types";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";

import Thumbnail from "./Thumbnail";
import { selectAsset } from "../actions/actionCreators";
import { dndTypes } from "../constants";

import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";
import "./styles/Asset-scene.css";

const AssetSourceSpec = {
	beginDrag(props) {
		const { assetId } = props;
		return { assetId };
	}
};

const collectDnD = connectDnD => {
	return {
		connectDragSource: connectDnD.dragSource()
	};
};

class Asset extends Component {
	containerAssetAttributes = {
		role: "none",
		onClick: event => {
			event.stopPropagation();
			this.props.selectAsset(this.props.assetData);
		}
	};

	render() {
		const { selected, onTimeline, assetData, connectDragSource } = this.props;
		const { name, image, type } = assetData;

		const selectedStyle = selected ? "selected" : "";
		const onTimelineStyle = onTimeline ? "onTimeline" : "";

		const assetAttributes = this.props.decorative ? {} : this.containerAssetAttributes;

		return connectDragSource(
			<div className={`asset ${type} ${selectedStyle} ${onTimelineStyle}`} {...assetAttributes}>
				<div className="hover-tint">
					<img src="/static/icons/edit_icon.png" className="edit-icon" alt={`edit ${type} icon`} />
					<img
						src="/static/icons/delete_phase_icon_2.png"
						className="delete-icon"
						alt={`delete ${type} icon`}
					/>
				</div>
				<Thumbnail {...{ image, name, type }} />
				<span>{name}</span>
			</div>
		);
	}
}

Asset.propTypes = {
	assetData: shape({
		id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		image: string
	}).isRequired,
	selectAsset: func,
	selected: bool.isRequired,
	onTimeline: bool,
	decorative: bool,
	connectDragSource: func.isRequired
};

Asset.defaultProps = {
	selectAsset: () => {
		console.log("Vahram, Asset click handler hasn't been setup ");
	},
	onTimeline: false,
	decorative: false
};

function mapStateToProps({ selectedAssetId, data }, { assetId, decorative }) {
	const selected = !!selectedAssetId && assetId === selectedAssetId && !decorative;

	const assetData = data[assetId];

	let ancestor = assetData;
	while (ancestor.parent) {
		ancestor = data[ancestor.parent.id];
	}
	const onTimeline = ancestor.type === "timeline" && !decorative;

	return { selected, onTimeline, assetData };
}

function mapDispatchToProps(dispatch) {
	return {
		selectAsset(asset) {
			dispatch(selectAsset(asset));
		}
	};
}

const dragableAsset = DragSource(dndTypes.ASSET, AssetSourceSpec, collectDnD)(Asset);
const connectedAsset = connect(mapStateToProps, mapDispatchToProps)(dragableAsset);
export default connectedAsset;

// export default Asset;
