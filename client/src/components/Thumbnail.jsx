import React, { PureComponent } from "react";
import { string, shape } from "prop-types";
// import path from "path";

import { frameSizes } from "../utils/constants";

import "./styles/Thumbnail.css";

const defaultImages = {
	phase: "/static/images/phase_thumbnails/phase_default_04_thumb.png",
	character: "/static/images/character_thumbnails/character_default-01.png",
	scene: "/static/images/scene_thumbnails/scene_default_01.png",
};
class Thumbnail extends PureComponent{
	fitImgToFrame = ({target: img}) => {
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
		// console.log(this.state.image)
		const { imageData } = this.props;
		let imageStyle = {}; 
		let imageSrc = defaultImages[this.props.type];

		if( imageData ){

			const {
				imageMoveX,
				imageMoveY,
				imageScaleX,
				imageScaleY,
				rotation
			} = imageData.imageDisplayData;

			imageStyle = {
				transform: `
							translate(${imageMoveX}px, ${imageMoveY}px) 
							rotate(${rotation}deg)
							scale(${imageScaleX}, ${imageScaleY}) 
				`
			};

			imageSrc = imageData.imageUrl;
		}

		return(
			<div className="image-cropper">
				<img
					// className="hidden"
					// onLoad={this.fitImgToFrame}
					ref={ thumbImageElem => {this.thumbImageElem = thumbImageElem} }
					src={ imageSrc }
					alt={ `thumbnail for ${this.props.name}` }
					style={ imageStyle }
				/>
			</div>
		);
	}
}

Thumbnail.propTypes = {
	imageData: shape({
		imageUrl: string.isRequired
	}),
	name: string.isRequired,
	type: string.isRequired
};

Thumbnail.defaultProps = {
	imageData: null
};

export default Thumbnail;