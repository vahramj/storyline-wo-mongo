import React, {Component} from "react";
import {string} from "prop-types";
import "./styles/Phase.css";

class Phase extends Component {
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
				<div className="phase-image-cropper">
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

Phase.propTypes = {
	img: string.isRequired,
	name: string.isRequired
};

export default Phase;