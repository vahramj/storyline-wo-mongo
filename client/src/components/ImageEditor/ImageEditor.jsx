import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { number, string, func, shape } from "prop-types";
import _ from "lodash";

import ImageEditorControls from "./ImageEditorControls";
import { dragSpec, dropSpec, collectDrag, collectDrop } from "./imageEditorDnDSpecs";

import { dndTypes } from "../../utils/constants";

import "./styles/ImageEditor.css";

const parentWidth = 400;
const parentHeight = 400;

class ImageEditor extends Component {
	constructor(props) {
		super(props);
		// console.log(this);

		const { frameWidth, frameHeight, borderRadius } = this.props;
		let { imageDisplayData } = this.props;
		// console.log("imageDisplayData from ImageEditor: ", imageDisplayData);
		const frameStyle = {
			width: frameWidth,
			height: frameHeight,
			borderRadius,
			left: (parentWidth - frameWidth) / 2,
			top: (parentHeight - frameHeight) / 2
		};

		if (!imageDisplayData) {
			imageDisplayData = {
				imageMoveX: 0,
				imageMoveY: 0,
				imageScaleX: 1,
				imageScaleY: 1,
				rotation: 0
			};
		}
		const scaleRatio = imageDisplayData.imageScaleY / imageDisplayData.imageScaleX;

		this.state = {
			frameStyle,
			dragOffsetX: 0,
			dragOffsetY: 0,
			lockScale: true,
			scaleRatio,
			...imageDisplayData
		};
	}

	// ██╗   ██╗████████╗██╗██╗     ███████╗
	// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
	// ██║   ██║   ██║   ██║██║     ███████╗
	// ██║   ██║   ██║   ██║██║     ╚════██║
	// ╚██████╔╝   ██║   ██║███████╗███████║
	//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝
                                     
	// vahram, change these to individual controls in ImageEditorControls
	setEditorState = newEditorState => {
		this.setState(newEditorState);
	};

	setLockScale = lock => {
		const { imageScaleX, imageScaleY, scaleRatio } = this.state;

		let newScaleRatio;
		if (imageScaleX !== 0 || imageScaleY !== 0) {
			newScaleRatio = lock ? imageScaleY / imageScaleX : scaleRatio;
		}

		this.setState({
			lockScale: lock,
			scaleRatio: newScaleRatio
		});
	};

	scaleImageTo = ({ newScaleX = this.state.imageScaleX, newScaleY = this.state.imageScaleY }) => {
		const { scaleRatio } = this.state;

		let scaleY = newScaleY;
		if (this.state.lockScale) {
			scaleY = newScaleX * scaleRatio;
		}

		// console.log(newScaleX, scaleY)
		this.setState({
			imageScaleX: newScaleX,
			imageScaleY: scaleY
		});
	};

	fitImageToFrame = ( imageElem ) => {
		const { frameWidth, frameHeight } = this.props;
		const { imageMoveX, imageMoveY } = this.state;

		const shiftX = frameWidth/2 - imageElem.width/2 - imageMoveX;
		const shiftY = frameHeight/2 - imageElem.height/2 - imageMoveY;
		// console.log(frameWidth, imageElem.width, shiftX);
		
		let newScaleX = frameHeight/imageElem.height;
		if (imageElem.width / imageElem.height < frameWidth / frameHeight) {
			newScaleX = frameWidth/imageElem.width
		}

		this.moveImageBy(shiftX, shiftY);
		this.scaleImageTo({ newScaleX });
		// this.thumbImageElem.classList.toggle("hidden");
	};

	moveImageBy(x, y){
		// console.log(this.state.imageMoveX, x)
		this.setState({
			imageMoveX: this.state.imageMoveX + x, 
			imageMoveY: this.state.imageMoveY + y
		});
	};

	dragImageBy(x, y) {
		// console.log("from dragImageBy: ", x, y);
		if (this.state.dragOffsetX === x && this.state.dragOffsetY === y) {
			return;
		}
		this.setState({
			dragOffsetX: x,
			dragOffsetY: y,
			imageMoveX: this.state.imageMoveX + x - this.state.dragOffsetX,
			imageMoveY: this.state.imageMoveY + y - this.state.dragOffsetY
		});
	};

	resetDragOffset() {
		this.setState({
			dragOffsetX: 0,
			dragOffsetY: 0
		});
	};

	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗  ██╗██████╗ ██╗     ███████╗
	// ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║  ██║██╔══██╗██║     ██╔════╝
	// █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ███████║██║  ██║██║     ███████╗
	// ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██║██║  ██║██║     ╚════██║
	// ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║██████╔╝███████╗███████║
	// ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝

	handleImageLoad = (event) => {
		if(!this.props.imageDisplayData){
			this.fitImageToFrame(event.target)
		}
	};

	handleClickReset = event => {
		event.preventDefault();

		this.setState({
			imageMoveX: 0,
			imageMoveY: 0,
			imageScaleX: 1,
			imageScaleY: 1,
			lockScale: true,
			scaleRatio: 1,
			rotation: 0
		});
	};

	handleClickFit = event => {
		event.preventDefault();
		this.fitImageToFrame( this.imageElem );
	};
	
	handleClickSave = event => {
		event.preventDefault();

		const { imageMoveX, imageMoveY, imageScaleX, imageScaleY, rotation } = this.state;
		this.props.setImageDisplayData({
			imageMoveX,
			imageMoveY,
			imageScaleX,
			imageScaleY,
			rotation
		});
		this.props.hideImageEditor();
	};

	handleClickCancel = event => {
		event.preventDefault();
		this.props.hideImageEditor();
	};

	render() {
		const { imageUrl } = this.props;
		const { imageMoveX, imageMoveY, imageScaleX, imageScaleY, rotation } = this.state;
		const { connectDragSource, connectDragPreview, connectDropTarget } = this.props;

		const imageStyle = {
			transform: `
						translate(${imageMoveX}px, ${imageMoveY}px) 
						rotate(${rotation}deg)
						scale(${imageScaleX}, ${imageScaleY}) 
			`
		};

		return (
			<div className="image-editor">
				{connectDropTarget(
					<div className="edit-area">
						<div className="uncropped-image-frame" style={this.state.frameStyle}>
							{connectDragSource(
								<img
									src={imageUrl}
									alt="thumbnail for asset"
									style={imageStyle}
									onLoad={this.handleImageLoad}
									ref={elem=>{
										this.imageElem = elem
									}}
								/>
							)}
						</div>
						<div className="unused-image-tint" />
						<div className="cropped-image-frame" style={this.state.frameStyle}>
							<img
								src={imageUrl}
								alt="thumbnail for asset"
								style={imageStyle}
							/>
						</div>
						{connectDragPreview(<div className="hidden-drag-preview" />)}
					</div>
				)}

				<div className="control-area">
					<ImageEditorControls
						editorState={this.state}
						setEditorState={this.setEditorState}
						scaleImageTo={this.scaleImageTo}
						setLockScale={this.setLockScale}
					/>
					<div className="btns">
						<button className="btn btn-danger" onClick={this.handleClickSave}>
							save
						</button>
						<button className="btn btn-primary" onClick={this.handleClickCancel}>
							cancel
						</button>
						<button className="btn" onClick={this.handleClickReset}>
							reset
						</button>
						<button className="btn" onClick={this.handleClickFit}>
							fit
						</button>
					</div>
				</div>
			</div>
		);
	}
}

ImageEditor.propTypes = {
	frameHeight: number.isRequired,
	frameWidth: number.isRequired,
	borderRadius: number,

	connectDragSource: func.isRequired,
	connectDragPreview: func.isRequired,
	connectDropTarget: func.isRequired,

	hideImageEditor: func.isRequired,
	setImageDisplayData: func.isRequired,

	imageUrl: string,
	imageDisplayData: shape({
		imageMoveX: number.isRequired,
		imageMoveY: number.isRequired,
		imageScaleX: number.isRequired,
		imageScaleY: number.isRequired,
		rotation: number.isRequired
	})
};

ImageEditor.defaultProps = {
	imageUrl: "",
	imageDisplayData: null,
	borderRadius: 0
};

const decorator = _.flowRight([
	DragSource(dndTypes.EDITABLE_IMAGE, dragSpec, collectDrag),
	DropTarget([dndTypes.EDITABLE_IMAGE, dndTypes.EDIT_IMAGE_HANDLE], dropSpec, collectDrop)
]);
export default decorator(ImageEditor);
