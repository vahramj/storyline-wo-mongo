import React, { Component } from "react";
import { func, shape, number } from "prop-types";

import SliderInput from "./SliderInput";

import "./styles/ImageEditorControls.css";

class ImageEditControls extends Component{
	handleCoordinateXChange = event => {
		this.props.setEditorState({
			imageMoveX: Number(event.target.value)
		});
	};

	handleCoordinateYChange = event => {
		this.props.setEditorState({
			imageMoveY: Number(event.target.value)
		});
	};

	handleScaleXChange = event => {
		// console.log(typeof event.target.value)
		this.props.setEditorState({
			imageScaleX: Number(event.target.value)
		});
	};

	handleScaleYChange = event => {
		this.props.setEditorState({
			imageScaleY: Number(event.target.value)
		});
	};

	handleRotateChange = event => {
		this.props.setEditorState({
			rotation: Number(event.target.value)
		});
	};

	render(){	
		const { editorState } = this.props;
		return(
			<div id="image-edit-controls">
				<fieldset>
					<SliderInput
						label="move X"
						name="CoordinateX"
						changeHandler={this.handleCoordinateXChange}
						value={ editorState.imageMoveX }
					/>
					<br />
					<SliderInput
						label="move Y"
						name="CoordinateY"
						changeHandler={this.handleCoordinateYChange}
						value={ editorState.imageMoveY }
					/>
				</fieldset>

				<fieldset>
					<SliderInput
						label="scale X"
						name="scaleX"
						changeHandler={this.handleScaleXChange}
						value={ editorState.imageScaleX }
						step="0.1"
						min="-5"
						max="5"
					/>
					<br />
					<SliderInput
						label="scale Y"
						name="scaleY"
						changeHandler={this.handleScaleYChange}
						value={ editorState.imageScaleY }
						step="0.1"
						min="-5"
						max="5"
					/>
				</fieldset>

				<fieldset>
					<SliderInput
						label="rotate"
						name="rotate"
						changeHandler={this.handleRotateChange}
						value={ editorState.rotation }
						min="0"
						max="359"
					/>
				</fieldset>
			</div>
		);
	}
}

ImageEditControls.propTypes = {
	setEditorState: func.isRequired,
	editorState: shape({
		imageMoveX: number.isRequired,
		imageMoveY: number.isRequired,
		imageScaleX: number.isRequired,
		imageScaleY: number.isRequired,
		rotation: number.isRequired
	}).isRequired
};

export default ImageEditControls;


