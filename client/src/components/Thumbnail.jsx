import React, { Component } from "react";
import { string } from "prop-types";

import "./styles/Thumbnail.css";

const frameSizes = {
	phase: {frameWidth: 125, frameHeight: 70},
	scene: {frameWidth: 125, frameHeight: 70},
	character: {frameWidth: 78, frameHeight: 78},
}

class Thumbnail extends Component{
	constructor(props){
		super(props);

		const defaultImage = "./static/images/phase_thumbnails/phase_default_04_thumb.png";
		this.state = {
			image: this.props.image || defaultImage
		}
	};

	fitImgToFrame = ({target: img}) => {
		// console.log(this.props.type)
		const { frameWidth, frameHeight } = frameSizes[this.props.type];

		if (img.width / img.height < frameWidth / frameHeight) {
			this.thumbImageElem.width = frameWidth ;
		} 
		else {
			this.thumbImageElem.width = frameHeight / img.height * img.width;
		}
		this.thumbImageElem.classList.toggle("hidden");
	};

	render(){
		return(
			<div className="image-cropper">
				<img
					className="hidden"
					onLoad={this.fitImgToFrame}
					ref={ thumbImageElem => {this.thumbImageElem = thumbImageElem} }
					src={ this.state.image }
					alt={ `thumbnail for ${this.props.name}` }
				/>
			</div>
		);
	}
}

Thumbnail.propTypes = {
	image: string,
	name: string.isRequired,
	type: string.isRequired
};

Thumbnail.defaultProps = {
	image: ""
};

export default Thumbnail;