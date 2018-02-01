import React, {Component} from "react";
import {string} from "prop-types";
import "./styles/Phase.css";

class Phase extends Component {
	constructor(props){
		super(props);

		this.onImgLoad = this.onImgLoad.bind(this);
	}

	componentDidUpdate(){
		this.phaseImg.width = this.state.phaseImgWidth;
	}

	onImgLoad({target: img}){
		const frameWidth = 125; 
		const frameHeight = 75;

		if(img.width/img.height < frameWidth/frameHeight) {
			this.setState({phaseImgWidth: frameWidth});
		}
		else {
			this.setState({phaseImgWidth: frameHeight/img.height*img.width});
		}
	}

	render(){
		return (
			<div className="phase">
{				<div className="hover-tint">
					<img src="/static/icons/edit_icon.png" className="edit-phase-icon" alt="edit icon"/>
					<img src="/static/icons/delete_phase_icon_2.png" className="delete-phase-icon" alt="delete phase icon"/>
				</div>
}				<div className="phase-image-cropper">
					<img 
						onLoad={this.onImgLoad} 
						ref={phaseImg => {this.phaseImg = phaseImg}}
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