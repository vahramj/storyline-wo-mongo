import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { string } from "prop-types";

import ImageEditorContainer from "./ImageEditorContainer";
import Modal from "../Modal";

import uploadImage from "../../utils/uploadImage";
import { frameSizes } from "../../utils/constants";

import "./styles/ImageSelector.css";

class ImageSelector extends Component {
	constructor(props) {
		super(props);

		const { type } = props;
		const { frameWidth, frameHeight, borderRadius } = frameSizes[type];

		this.state = {
			frameWidth,
			frameHeight,
			borderRadius,
			image: null,
			// loaded: false,
			imageEditorShown: false,
			imageDisplayData: {
				imageMoveX: 0,
				imageMoveY: 0,
				imageScaleX: 1,
				imageScaleY: 1,
				rotation: 0
			}
		};
	}

	// vahram, replace this with individual functions for each Control when implementing enhanced Image editing
	setImageEditData = imageDisplayData => {
		this.setState({
			imageDisplayData
		});
	};

	uploadImage = files => {
		this.setState({
			image: "uploading"
		});

		uploadImage(files[0])
			.then(url => {
				console.log(url);
				this.setState({
					image: url
				});
			})
			.catch(err => {
				console.log("error uploading the file", err);
			});
	};

	handleEditClick = event => {
		event.preventDefault();
		// event.stopPropagation();
		// console.log(this);
		this.showImageEditor();
	};

	showImageEditor (){
		this.setState({
			imageEditorShown: true
		});
	}

	hideImageEditor = () => {
		this.setState({
			imageEditorShown: false
		});
	};

	handleImageDrop = files => {
		this.setState({
			image: files[0].preview,
			imageDisplayData: {
				imageMoveX: 0,
				imageMoveY: 0,
				imageScaleX: 1,
				imageScaleY: 1,
				rotation: 0
			}
		});
		this.showImageEditor();
		// console.log(files[0].preview);
	};

	renderImage = () => {
		const { type } = this.props;
		let imagePreview;

		if (this.state.image === null) {
			imagePreview = (
				<p>
					click me<br />
					or<br />
					drop an image onto me
				</p>
			);
		} 
		// else if (this.state.image === "uploading") {
		// 	imagePreview = <p>uploading...</p>;
		// } 
		else {
			const {
				imageMoveX,
				imageMoveY,
				imageScaleX,
				imageScaleY,
				rotation
			} = this.state.imageDisplayData;

			const imageStyle = {
				transform: `
							translate(${imageMoveX}px, ${imageMoveY}px) 
							rotate(${rotation}deg)
							scale(${imageScaleX}, ${imageScaleY}) 
				`
			};

			imagePreview = (
				<img style={imageStyle} src={this.state.image} alt={`thumbnail for ${type}`} />
			);
		}
		// console.log(frameWidth, frameHeight)
		return (
			<div
				className="image-loader-frame"
				style={{
					width: this.state.frameWidth,
					height: this.state.frameHeight,
					borderRadius: `${this.state.borderRadius}%`
				}}
			>
				{imagePreview}
			</div>
		);
	};

	render() {
		return (
			<div className="image-loader">
				<Dropzone className="dropzone" onDrop={this.handleImageDrop}>
					{this.renderImage()}
				</Dropzone>

				<button className="btn" onClick={this.showImageEditor}>
					edit
				</button>

				<Modal show={this.state.imageEditorShown}>
					<ImageEditorContainer
						hideImageEditor={this.hideImageEditor}
						imageUrl={this.state.image}
						setImageEditData={this.setImageEditData}
						imageDisplayData={this.state.imageDisplayData}
						frameWidth={this.state.frameWidth}
						frameHeight={this.state.frameHeight}
						borderRadius={this.state.borderRadius}
					/>
				</Modal>
			</div>
		);
	}
}

ImageSelector.propTypes = {
	type: string
};

ImageSelector.defaultProps = {
	type: "asset"
};

export default ImageSelector;
