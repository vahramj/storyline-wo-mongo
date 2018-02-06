import React, { Component } from "react";
import { string } from "prop-types";
import "./styles/Phase.css";

class Phase extends Component {
	constructor(props){
		super(props);

		const defaultImage = "./static/images/phase_thumbnails/phase_default_04_thumb.png";
		this.state = {
			image: this.props.image || defaultImage
		}
	};

	componentDidMount(){
		// this.fitImgToFrame({target: this.thumbImageElem})
	};

	fitImgToFrame = ({target: img}) => {
		const frameWidth = 125;
		const frameHeight = 75;

		if (img.width / img.height < frameWidth / frameHeight) {
			this.thumbImageElem.width = frameWidth ;
		} 
		else {
			this.thumbImageElem.width = frameHeight / img.height * img.width;
		}
		this.thumbImageElem.classList.toggle("hidden");
	};

	render() {
		return (
			<div className="phase">
				<div className="hover-tint">
					<img
						src="/static/icons/edit_icon.png"
						className="edit-phase-icon"
						alt="edit icon"
					/>
					<img
						src="/static/icons/delete_phase_icon_2.png"
						className="delete-phase-icon"
						alt="delete phase icon"
					/>
				</div>
				<div className="image-cropper">
					<img
						className="hidden"
						onLoad={this.fitImgToFrame}
						ref={ thumbImageElem => {this.thumbImageElem = thumbImageElem} }
						src={this.state.image}
						alt={`thumbnail for ${this.props.name}`}
					/>
				</div>
				<span>{this.props.name}</span>
			</div>
		);
	}
}

Phase.propTypes = {
	image: string,
	name: string.isRequired
};

Phase.defaultProps = {
	image: "./static/images/phase_thumbnails/phase_default_04_thumb.png"
};
export default Phase;
