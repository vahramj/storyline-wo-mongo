import React, {Component} from "react";
import {string} from "prop-types";
import "./styles/Phase.css";

class Phase extends Component {
	constructor(props){
		super(props);

		this.onImgLoad = this.onImgLoad.bind(this);
	}

	componentDidUpdate(){
		// console.log(this.state.width);
		this.img.width = this.state.width;
	}

	onImgLoad({target: img}){
		const frameWidth = 135; 
		const frameHeight = 75;

		if(img.width/img.height < frameWidth/frameHeight) {
			this.setState({width: frameWidth});
		}
		else {
			this.setState({width: frameHeight/img.height*img.width});
		}
	}

	render(){
		return (
			<div className="phase">
				<div className="phase-image-cropper">
					<img 
						onLoad={this.onImgLoad} 
						ref={img => {this.img = img}}
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