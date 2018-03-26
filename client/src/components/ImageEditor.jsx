import React, { Component } from "react";
import { bool } from "prop-types";

import "./styles/ImageEditor.css";

class ImageEditor extends Component{
	constructor(props){
		super(props);
		console.log(this);
	}

	render(){
		const { show } = this.props;
		const style = {
			display: show ? "block" : "none"
		};

		return(
			<div style={style} className="image-editor-bg">
				<div className="image-editor-container">
					I am the image editor
				</div>
			</div>
		);
	}
}

ImageEditor.propTypes = {
	show: bool
}

ImageEditor.defaultProps = {
	show: false
}

export default ImageEditor;