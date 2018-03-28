import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { number, string, func } from "prop-types";
import _ from "lodash";

import { dndTypes } from "../utils/constants";

import "./styles/ImageEditor.css";

const parentWidth = 400;
const parentHeight = 400;

const dragSpec = {
	beginDrag() {
		console.log("dragging");
		return {};
	}
};

const dropSpec = {
	drop(props, monitor, component) {
		const { x, y } = monitor.getDifferenceFromInitialOffset();
		console.log("dropped");
		component.moveImageBy(x, y);
	}
};

function collectDrag(connectDnD, monitor) {
	return {
		connectDragSource: connectDnD.dragSource(),
		connectDragPreview: connectDnD.dragPreview()
		// isDragging: monitor.isDragging()
	};
}

function collectDrop(connectDnD) {
	return {
		connectDropTarget: connectDnD.dropTarget()
	};
}

class ImageEditor extends Component {
	constructor(props) {
		super(props);
		// console.log(this);

		const { frameWidth, frameHeight } = this.props;

		const frameStyle = {
			width: frameWidth,
			height: frameHeight,
			left: (parentWidth - frameWidth) / 2,
			top: (parentHeight - frameHeight) / 2
		};

		this.state = {
			frameStyle,
			imageX: 0,
			imageY: 0
		};
	};

	moveImageBy(x, y) {
		console.log("from moveImageBy: ", x, y);
		this.setState({
			imageX: this.state.imageX + x,
			imageY: this.state.imageY + y
		});
	};

	handleCoordinateXChange = (event)=>{
		// console.log(typeof event.target.value)
		this.setState({
			imageX: Number(event.target.value)
		})
	};

	handleCoordinateYChange = (event)=>{
		this.setState({
			imageY: Number(event.target.value)
		})
	};

	render() {
		const { imageUrl } = this.props;
		const { imageX, imageY } = this.state;
		const { connectDragSource, connectDragPreview, connectDropTarget } = this.props;

		const imageStyle = {
			transform: `translate(${imageX}px, ${imageY}px)`
		};
		console.log("fromRender: ", imageStyle);
		// why doesn't translate turn into a valid style
		const image = <img src={imageUrl} alt="thumbnail for asset" style={imageStyle} />;
		return (
			<div className="image-editor">
				{connectDropTarget(
					<div className="edit-area">
						<div className="uncropped-image-frame" style={this.state.frameStyle}>
							{connectDragSource(image)}
						</div>
						<div className="unused-image-tint" />
						<div className="cropped-image-frame" style={this.state.frameStyle}>
							{image}
						</div>
					</div>
				)}
				<div id="image-edit-controls">
					<input
						type="number"
						name="CoordinateX"
						onChange={this.handleCoordinateXChange}
						value={this.state.imageX}
					/>
					<input
						type="number"
						name="CoordinateY"
						onChange={this.handleCoordinateYChange}
						value={this.state.imageY}
					/>
				</div>
			</div>
		);
	}
}

ImageEditor.propTypes = {
	imageUrl: string,
	frameHeight: number.isRequired,
	frameWidth: number.isRequired,
	connectDragSource: func.isRequired,
	connectDragPreview: func.isRequired,
	connectDropTarget: func.isRequired
};

ImageEditor.defaultProps = {
	imageUrl: ""
};

const decorator = _.flowRight([
	DragSource(dndTypes.EDITABLE_IMAGE, dragSpec, collectDrag),
	DropTarget([dndTypes.EDITABLE_IMAGE, dndTypes.EDIT_IMAGE_HANDLE], dropSpec, collectDrop)
]);
export default decorator(ImageEditor);
