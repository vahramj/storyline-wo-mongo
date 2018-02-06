import React, {Component} from "react";
import {string} from "prop-types";
import "./styles/Character.css";

class Character extends Component {
	componentDidUpdate(){
		this.thumbImgElem.width = this.state.fittedImgWidth;
	}

	fitImgToFrame = ({target: img})=>{
		const frameWidth = 125; 
		const frameHeight = 75;

		if(img.width/img.height < frameWidth/frameHeight) {
			this.setState({fittedImgWidth: frameWidth});
		}
		else {
			this.setState({fittedImgWidth: frameHeight/img.height*img.width});
		}
	}

	render(){
		return (
			<div className="character">
				<div className="hover-tint">
					<img 
						src="/static/icons/edit_icon.png" 
						className="edit-character-icon" 
						alt="edit icon"
					/>
					<img 
						src="/static/icons/delete_phase_icon_2.png" 
						className="delete-character-icon" 
						alt="delete character icon"
					/>
				</div>
				<div className="character-image-cropper">
					<img 
						onLoad={this.fitImgToFrame} 
						ref={thumbImgElem => {this.thumbImgElem = thumbImgElem}}
						src={this.props.img} 
						alt={`thumbnail for ${this.props.name}`} 
					/>
				</div>
				<span>{this.props.name}</span>
			</div>
		);
	}
};

Character.propTypes = {
	img: string.isRequired,
	name: string.isRequired
};

export default Character;