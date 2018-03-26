import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { string } from "prop-types";

import uploadImage from "../utils/uploadImage";

import "./styles/ImageSelector.css";

class ImageSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			loaded: false
		};
	}

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

	showPreview = files => {
		this.setState({
			image: files[0].preview
		});
		console.log(files[0].preview)

	}

	frameImage = (event) => {
		event.preventDefault();
		event.stopPropagation();
		console.log(this);
	}

	renderImage = () => {
		let image;
		if (this.state.image === null) {
			image = (
				<p>
					click me<br />
					or<br />
					drop an image onto me
				</p>
			);
		} 
		else if (this.state.image === "uploading") {
			image = <p>uploading...</p>;
		} 
		else {
			image = (
				<div>
					<p style={{ display: this.state.loaded ? "none" : "block" }}>uploading...</p>
					<img
						style={{display: this.state.loaded ? "block" : "none"}}
						src={this.state.image}
						alt={`thumbnail for ${this.props.type}`}
						onLoad={() => {
							this.setState({ loaded: true });
						}}
					/>
				</div>
			);
		}
		return <div className="image-loader-frame">{image}</div>;
	}

	render() {
		return (
			<div className="image-loader">
				<Dropzone
					className="dropzone"
					// onDrop={this.uploadImage}
					onDrop={this.showPreview}
					ref={elem => {
						this.dropzoneElem = elem;
					}}
				>
					{this.renderImage}
				</Dropzone>
				<button className="btn" onClick={this.frameImage}>frame</button>
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
