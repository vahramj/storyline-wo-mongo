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
			loaded: false,
			imageEditorShown: false,
			imageEditData: null,
		};
	}

	getImagePreview = files => {
		this.setState({
			image: files[0].preview
		});
		// console.log(files[0].preview);
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

	showImageEditor = event => {
		event.preventDefault();
		// event.stopPropagation();
		// console.log(this);
		this.setState({
			imageEditorShown: true
		});
	};

	hideImageEditor = () => {
		this.setState({
			imageEditorShown: false
		});
	};

	setImageEditData = (imageEditData) => {
		this.setState({
			imageEditData
		});
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
		else if (this.state.image === "uploading") {
			imagePreview = <p>uploading...</p>;
		} 
		else {
			imagePreview = (
				<div>
					<p style={{ display: this.state.loaded ? "none" : "block" }}>uploading...</p>
					<img
						style={{ display: this.state.loaded ? "block" : "none" }}
						src={this.state.image}
						alt={`thumbnail for ${type}`}
						onLoad={() => {
							this.setState({ loaded: true });
						}}
					/>
				</div>
			);
		}
		// console.log(frameWidth, frameHeight)
		return (
			<div
				className="image-loader-frame"
			>
				{imagePreview}
			</div>
		);
	};

	render() {
		// const { type } = this.props;
		return (
			<div className="image-loader">
				<Dropzone
					className="dropzone"
					style={{
						width: this.state.frameWidth,
						height: this.state.frameHeight,
						borderRadius: `${this.state.borderRadius}%`
					}}
					// onDrop={this.uploadImage}
					onDrop={this.getImagePreview}
					// ref={elem => {
						// this.dropzoneElem = elem;
					// }}
				>
					{this.renderImage}
				</Dropzone>
				<button className="btn" onClick={this.showImageEditor}>
					frame
				</button>
				<Modal show={this.state.imageEditorShown} >
					<ImageEditorContainer
						hideImageEditor={this.hideImageEditor}
						imageUrl={this.state.image}
						// type={type}
						setImageEditData={this.setImageEditData}
						imageEditData={this.state.imageEditData}
						frameWidth={this.state.frameWidth}
						frameHeight={this.state.frameHeight}
						borderRadius={this.state.borderRadius}
					/>
				</Modal>
			</div>

			// <input
			// 	type="file"
			// 	id="imageFile"
			// 	name="imageFile"
			// 	ref = {inputElem => {
			// 		this.fileInputElem = inputElem
			// 	}}
			// 	onChange = {this.onImageChange}
			// />
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
