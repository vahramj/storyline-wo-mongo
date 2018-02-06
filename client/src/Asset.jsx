import React, { Component } from "react";
import { string } from "prop-types";
import "./styles/Asset.css";
import "./styles/Asset-character.css";
import "./styles/Asset-phase.css";

class Asset extends Component {
	constructor(props){
		super(props);

		const defaultImage = "./static/images/phase_thumbnails/phase_default_04_thumb.png";
		this.state = {
			image: this.props.image || defaultImage
		}
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
			<div className={`asset ${this.props.type}`}>
				<div className="hover-tint">
					<img
						src="/static/icons/edit_icon.png"
						className="edit-icon"
						alt={`edit ${this.props.type} icon`}
					/>
					<img
						src="/static/icons/delete_phase_icon_2.png"
						className="delete-icon"
						alt={`delete ${this.props.type} icon`}
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

Asset.propTypes = {
	image: string,
	name: string.isRequired,
	type: string.isRequired
};

Asset.defaultProps = {
	image: ""
};
export default Asset;
