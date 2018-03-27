import React, { Component } from "react";
import { number, string } from "prop-types";

import "./styles/ImageEditor.css";

const parentWidth = 400;
const parentHeight = 400;

class ImageEditor extends Component{
	constructor(props){
		super(props);
		console.log(this);
	}

	render(){
		const { imageUrl, frameWidth, frameHeight } = this.props;

		const image = <img
				// style={{ display: this.state.loaded ? "block" : "none" }}
				src={imageUrl}
				alt="thumbnail preview for asset"
				// onLoad={() => {
				// 	this.setState({ loaded: true });
				// }}
			/>
		// vahram, when done, break this up to pop-up component & image-editor component
		return(
			<div className="image-editor">
				<div className="uncropped-image-frame">
					{image}
				</div>
				<div className="unused-image-tint" />
				<div
					className="image-preview-frame"
					style={{
						width: frameWidth,
						height: frameHeight
					}}
				>
					{image}
				</div>
			</div>
		);
	}
}

ImageEditor.propTypes = {
	imageUrl: string,
	frameHeight: number.isRequired,
	frameWidth: number.isRequired
}

ImageEditor.defaultProps = {
	imageUrl: ""
}

export default ImageEditor;