import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { string, number, shape, func } from "prop-types";
// import { connect } from "react-redux";

import ImageEditorContainer from "./ImageEditorContainer";
import Modal from "../Modal";

import { frameSizes } from "../../utils/constants";
// import { setImageData } from "../../actions/actionCreators";

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
			imageEditorShown: false
		};
	}

	// ██╗   ██╗████████╗██╗██╗     ███████╗
	// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
	// ██║   ██║   ██║   ██║██║     ███████╗
	// ██║   ██║   ██║   ██║██║     ╚════██║
	// ╚██████╔╝   ██║   ██║███████╗███████║
	//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

	setImageDisplayData = imageDisplayData => {
		this.props.setImageData({
			imageDisplayData
		})
	};

	showImageEditor (){
		this.setState({
			imageEditorShown: true
		});
	};

	hideImageEditor = () => {
		this.setState({
			imageEditorShown: false
		});
	};

	renderImage = () => {
		const { type, imageData } = this.props;
		// console.log(imageData)
		let imagePreview;

		if ( !imageData || imageData.imageUrl === "" ) {
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
			const { imageUrl, imageDisplayData } = imageData;
			let imageStyle = {};

			if(imageDisplayData){
				const {
					imageMoveX,
					imageMoveY,
					imageScaleX,
					imageScaleY,
					rotation
				} = imageDisplayData;

				imageStyle = {
					transform: `
								translate(${imageMoveX}px, ${imageMoveY}px) 
								rotate(${rotation}deg)
								scale(${imageScaleX}, ${imageScaleY}) 
					`
				};
			}

			imagePreview = (
				<img style={imageStyle} src={imageUrl} alt={`thumbnail for ${type}`} />
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


	// ███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗  ██╗██████╗ ██╗     ███████╗
	// ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║  ██║██╔══██╗██║     ██╔════╝
	// █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ███████║██║  ██║██║     ███████╗
	// ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██╔══██║██║  ██║██║     ╚════██║
	// ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ██║  ██║██████╔╝███████╗███████║
	// ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝
	handleEditClick = event => {
		event.preventDefault();
		this.showImageEditor();
	};

	handleImageDrop = files => {
		this.props.setImageData({
			imageFile: files[0],
			imageUrl: files[0].preview,
			imageDisplayData: null
		});
		this.showImageEditor();
		// console.log(files[0].preview);
	};

	render() {
		const { imageData } = this.props;
		const imageUrl = imageData ? imageData.imageUrl : "";
		const imageDisplayData = imageData ? imageData.imageDisplayData : null;

		return (
			<div className="image-loader">
				<Dropzone className="dropzone" onDrop={this.handleImageDrop}>
					{this.renderImage()}
				</Dropzone>

				<button className="btn" onClick={this.handleEditClick}>
					edit
				</button>

				<Modal show={this.state.imageEditorShown}>
					<ImageEditorContainer
						hideImageEditor={this.hideImageEditor}
						setImageDisplayData={this.setImageDisplayData}

						imageUrl={imageUrl}
						imageDisplayData={imageDisplayData}

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
	type: string,
	imageData: shape({
		imageUrl: string.isRequired,
		imageFile: shape(),
		imageDisplayData: shape({
			imageMoveX: number.isRequired,
			imageMoveY: number.isRequired,
			imageScaleX: number.isRequired,
			imageScaleY: number.isRequired,
			rotation: number.isRequired
		})
	}),
	setImageData: func.isRequired
};

ImageSelector.defaultProps = {
	type: "asset", 
	imageData: null
};

// function mapStateToProps({ imageData }){
// 	return { imageData };
// }

export default ImageSelector;
