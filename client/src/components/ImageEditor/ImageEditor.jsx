import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { number, string, func } from "prop-types";
import _ from "lodash";

import { dndTypes } from "../../utils/constants";

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
		// const { x, y } = monitor.getDifferenceFromInitialOffset();
		console.log("dropped");
		// component.moveImageBy(x, y);
		component.resetMove()
	},
	hover(props, monitor, component){
		const { x, y } = monitor.getDifferenceFromInitialOffset();
		component.moveImageBy(x, y);
		console.log(monitor.getDifferenceFromInitialOffset())
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
			imageMoveDiffX: 0,
			imageMoveDiffY: 0,
			imageMoveX: 0,
			imageMoveY: 0,
			imageScaleX: 1,
			imageScaleY: 1,
		};
	};

	moveImageBy(x, y) {
		console.log("from moveImageBy: ", x, y);
		if(this.state.imageMoveDiffX === x && this.state.imageMoveDiffY === y){
			return;
		}
		this.setState({
			imageMoveDiffX: x,
			imageMoveDiffY: y,
			imageMoveX: this.state.imageMoveX + x - this.state.imageMoveDiffX,
			imageMoveY: this.state.imageMoveY + y - this.state.imageMoveDiffY
		});
	};

	resetMove(){
		this.setState({
			imageMoveDiffX: 0,
			imageMoveDiffY: 0,			
		})
	}

	handleCoordinateXChange = (event)=>{
		// console.log(typeof event.target.value)
		this.setState({
			imageMoveX: Number(event.target.value)
		})
	};

	handleCoordinateYChange = (event)=>{
		this.setState({
			imageMoveY: Number(event.target.value)
		})
	};

	handleScaleXChange = (event)=>{
		// console.log(typeof event.target.value)
		this.setState({
			imageScaleX: Number(event.target.value)
		})
	};

	handleScaleYChange = (event)=>{
		this.setState({
			imageScaleY: Number(event.target.value)
		})
	};

	render() {
		const { imageUrl } = this.props;
		const { imageMoveX, imageMoveY, imageScaleX, imageScaleY } = this.state;
		const { connectDragSource, connectDragPreview, connectDropTarget } = this.props;

		const imageStyle = {
			transform: `translate(${imageMoveX}px, ${imageMoveY}px) scale(${imageScaleX}, ${imageScaleY})`,
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
					{
						connectDragPreview(<div className="hidden-drag-preview" />)
					}
					</div>
				)}
				<div id="image-edit-controls">
					<fieldset>
						<label htmlFor="CoordinateX">
							<span>move X: </span>
							<input
								type="number"
								id="CoordinateX"
								onChange={this.handleCoordinateXChange}
								value={this.state.imageMoveX}
							/>
						</label>

						<label htmlFor="CoordinateY">
							<span>move Y: </span>
							<input
								type="number"
								id="CoordinateY"
								onChange={this.handleCoordinateYChange}
								value={this.state.imageMoveY}
							/>
						</label>
					</fieldset>

					<fieldset>
						<label htmlFor="ScaleX">
							<span>scale X: </span>
							<input
								type="range"
								onChange={this.handleScaleXChange}
								value={this.state.imageScaleX}
								step="0.1"
								min="-5"
								max="5"
							/>
							<input
								type="number"
								id="ScaleX"
								onChange={this.handleScaleXChange}
								value={this.state.imageScaleX}
								step="0.1"
							/>
						</label>
						<br />

						<label htmlFor="CoordinateY">
							<span>scale Y: </span>
							<input
								type="range"
								id="CoordinateY"
								onChange={this.handleScaleYChange}
								value={this.state.imageScaleY}
								step="0.1"
							/>
						</label>
					</fieldset>
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
