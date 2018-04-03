import React, { Component } from "react";
import { bool, string, func } from "prop-types";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import { Link } from "react-router-dom";
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
	constructor(props) {
		super(props);
		this.state = {
			editAssetToolsShown: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.selected) {
			this.setState({
				editAssetToolsShown: false
			});
		}
	}

	onClickHandler = event => {
		const { assetId } = this.props;
		event.stopPropagation();
		this.props.selectAsset(assetId);
	};

	onDoubleClickHandler = () => {
		// event.stopPropagation()
		this.setState({
			editAssetToolsShown: true
		});
	};

	onEditAssetClickHandler = () => {
		console.log(`editing asset ${this.props.assetId}`);
		console.log(this.props);
		// this.props.history.push("/details");

	};

	renderEditAssetTools() {
		// console.log(this);
		const { type, assetId } = this.props;

		if (!this.state.editAssetToolsShown) {
			return (
				<div
					className="hover-tint"
					style={{ opacity: 0 }}
					onDoubleClick={this.onDoubleClickHandler}
				/>
			);
		}
		return (
			<div className="hover-tint">
				<Link to={`/edit/${type}/${assetId}`}>
					<img
						src="/static/icons/edit_icon.png"
						className="edit-icon"
						alt={`edit ${type} icon`}
						// role="none"
						// onClick={this.onEditAssetClickHandler}
					/>
				</Link>
				<img
					src="/static/icons/delete_phase_icon_2.png"
					className="delete-icon"
					alt={`delete ${type} icon`}
				/>
			</div>
		);
	}

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
		const onTimelineClassName = onTimeline ? "onTimeline" : "";
		const draggingClassName = isDragging ? "dragging" : "";

		return connectDragSource(
			<div
				className={`asset ${type} ${selectedStyle} ${onTimelineClassName} ${draggingClassName}`}
				role="none"
				onClick={this.onClickHandler}
			>
				{this.renderEditAssetTools()}
				<AssetBase assetId={assetId} />
				{connectDragPreview(<div className="hidden-drag-preview" />)}
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
