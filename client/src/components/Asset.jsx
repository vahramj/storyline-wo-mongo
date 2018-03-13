import React, { Component } from "react";
import { bool, string, func } from "prop-types";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import _ from "lodash";

import AssetBase from "./AssetBase";
import { selectAsset } from "../actions/actionCreators";
import { dndTypes } from "../utils/constants";

import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";
import "./styles/Asset-scene.css";

// ██████╗ ███╗   ██╗██████╗
// ██╔══██╗████╗  ██║██╔══██╗
// ██║  ██║██╔██╗ ██║██║  ██║
// ██║  ██║██║╚██╗██║██║  ██║
// ██████╔╝██║ ╚████║██████╔╝
// ╚═════╝ ╚═╝  ╚═══╝╚═════╝
const AssetSourceSpec = {
	beginDrag(props) {
		props.selectAsset(props.assetId);
		// console.log(props);
		const { assetId, type } = props;
		return { assetId, type };
	}
};

const collectDnD = (connectDnD, monitor) => {
	return {
		connectDragSource: connectDnD.dragSource(),
		connectDragPreview: connectDnD.dragPreview(),
		isDragging: monitor.isDragging()
	};
};

// ██████╗ ███████╗ █████╗  ██████╗████████╗
// ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
// ██████╔╝█████╗  ███████║██║        ██║
// ██╔══██╗██╔══╝  ██╔══██║██║        ██║
// ██║  ██║███████╗██║  ██║╚██████╗   ██║
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝
class Asset extends Component {
	onClickHandler = event => {
		const { assetId } = this.props;
		event.stopPropagation();
		this.props.selectAsset(assetId);
	};

	render() {
		const {
			selected,
			onTimeline,
			assetId,
			type,
			isDragging,
			connectDragSource,
			connectDragPreview
		} = this.props;

		const selectedStyle = selected ? "selected" : "";
		const onTimelineStyle = onTimeline ? "onTimeline" : "";
		const draggingStyle = isDragging ? "dragging" : "";

		return connectDragSource(
			<div
				className={`asset ${type} ${selectedStyle} ${onTimelineStyle} ${draggingStyle}`}
				role="none"
				onClick={this.onClickHandler}
			>
				<div className="hover-tint">
					<img
						src="/static/icons/edit_icon.png"
						className="edit-icon"
						alt={`edit ${type} icon`}
					/>
					<img
						src="/static/icons/delete_phase_icon_2.png"
						className="delete-icon"
						alt={`delete ${type} icon`}
					/>
				</div>
				<AssetBase assetId={assetId} />
				{connectDragPreview(<div className="hidden-preview" />)}
			</div>
		);
	}
}

// ██████╗ ██████╗  ██████╗ ██████╗    ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
// ██████╔╝██████╔╝██║   ██║██████╔╝█████╗██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
// ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════╝██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
// ██║     ██║  ██║╚██████╔╝██║           ██║      ██║   ██║     ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝           ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
Asset.propTypes = {
	assetId: string.isRequired,
	type: string.isRequired,
	selected: bool.isRequired,
	onTimeline: bool,
	selectAsset: func,
	connectDragSource: func.isRequired,
	connectDragPreview: func.isRequired,
	isDragging: bool.isRequired
};

Asset.defaultProps = {
	selectAsset: () => {
		console.log("Vahram, Asset click handler hasn't been setup ");
	},
	onTimeline: false
};

// ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝
// ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗
// ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
const actions = { selectAsset };

function mapStateToProps({ assetsData }, { assetId }) {
	// console.log(assetsData);
	const { selectedAssetId, data } = assetsData;
	
	const selected = !!selectedAssetId && assetId === selectedAssetId;

	const assetData = data[assetId];

	let ancestor = assetData;
	while (ancestor.parent) {
		ancestor = data[ancestor.parent.id];
	}
	const onTimeline = ancestor.type === "timeline";

	const { type } = assetData;

	return { selected, onTimeline, type };
}

const decorator = _.flowRight([
	connect(mapStateToProps, actions),
	DragSource(dndTypes.ASSET, AssetSourceSpec, collectDnD)
]);
export default decorator(Asset);

// export default Asset;
