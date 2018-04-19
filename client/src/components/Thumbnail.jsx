import React, { PureComponent } from "react";
import { string, shape } from "prop-types";
// import path from "path";

// import { frameSizes } from "../utils/constants";
import testImageUrl from "../utils/testImage.js";

import "./styles/Thumbnail.css";

const defaultImages = {
	phase: "/static/images/phase_thumbnails/phase_default_04_thumb.png",
	character: "/static/images/character_thumbnails/character_default-01.png",
	scene: "/static/images/scene_thumbnails/scene_default_01.png",
};
class Thumbnail extends PureComponent{
	// fitImgToFrame = ({target: img}) => {
	// 	const { frameWidth, frameHeight } = frameSizes[this.props.type];

	// 	if (img.width / img.height < frameWidth / frameHeight) {
	// 		this.thumbImageElem.width = frameWidth ;
	// 	} 
	// 	else {
	// 		this.thumbImageElem.width = frameHeight / img.height * img.width;
	// 	}
	// 	this.thumbImageElem.classList.toggle("hidden");
	// };
	constructor(props){
		super(props);
		this.state = {
			imageStyle: {},
			imageSrc: defaultImages[props.type]
		}
	}

	setupImage = (imageData) => {
		const component = this;
		
		if( imageData && imageData.imageUrl){
			const newState = {};

			testImageUrl(imageData.imageUrl)
				.then(function _goodImageUrl_(){
					newState.imageSrc = imageData.imageUrl;	

					if(imageData.imageDisplayData){

						const {
							imageMoveX,
							imageMoveY,
							imageScaleX,
							imageScaleY,
							rotation
						} = imageData.imageDisplayData;

						const imageStyle = {
							transform: `
										translate(${imageMoveX}px, ${imageMoveY}px) 
										rotate(${rotation}deg)
										scale(${imageScaleX}, ${imageScaleY}) 
							`
						};
						newState.imageStyle = imageStyle;

						component.setState(newState);
					}
				})
				.catch(function _badImageUrl_(err){
					console.log("error setting up image:", err);
				})
		}

	}
	
	componentDidMount(){
		const { imageData } = this.props;
		this.setupImage(imageData);
	}

	componentWillReceiveProps(nextProps){
		const { imageData } = nextProps;
		this.setupImage(imageData);		
	}

	render(){
		const { imageStyle, imageSrc } = this.state;

		return(
			<div className="image-cropper">
				<img
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