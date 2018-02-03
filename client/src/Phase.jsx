import React, {Component} from "react";
import {string} from "prop-types";
import "./styles/Phase.css";

class Phase extends Component {
	componentWillMount(){
		// console.log(this.props.image);
		let thumbnail;

		if(this.props.image){
			thumbnail = (
				<div>
					<div className="phase-image-cropper">
						<img 
							onLoad={this.fitImgToFrame} 
							ref={thumbImageElem => {this.thumbImageElem = thumbImageElem}}
							src={this.props.image} 
							alt={`thumbnail for ${this.props.name}`} 
						/>
					</div>
					<span>{this.props.name}</span>
				</div>
			);
		}
		else {
			thumbnail = (
				<div className="default-thumbnail">
					<img src="./static/images/phase_thumbnails/phase_default_04_thumb.png" alt=""/>
					<div className="default-thumbnail-tint" />
					<div className="name-frame">
						<div className="name-crop">
							<span>{this.props.name}</span>
						</div>
					</div>
				</div>
			);
		}
		this.setState({thumbnail})
	}

	componentDidUpdate(){
		this.thumbImageElem.width = this.state.fittedImgWidth;
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
				{this.state.thumbnail}
			</div>
		);
	}
};

Phase.propTypes = {
	image: string,
	name: string.isRequired
};

Phase.defaultProps = {
	image: ""
}
export default Phase;