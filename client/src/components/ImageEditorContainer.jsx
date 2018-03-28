import React from "react";
import { string } from "prop-types";

import ContainerHeader from "./ContainerHeader";
import ImageEditor from "./ImageEditor/ImageEditor";

import { frameSizes } from "../utils/constants";

import "./styles/ImageEditorContainer.css";

const ImageEditorContainer = props => {
	const { imageUrl, type } = props;
	const { frameWidth, frameHeight } = frameSizes[type];

	const imageEditorProps = {
		frameWidth,
		frameHeight,
		imageUrl
	};
	// vahram, when done, break this up to pop-up component & image-editor component
	return(
		<div className="image-editor-container">
			<ContainerHeader headerText="edit image" />
			<div className="image-editor-container-body">
				<ImageEditor { ...imageEditorProps } />
			</div>
		</div>
	);
}

ImageEditorContainer.propTypes = {
	imageUrl: string,
	type: string.isRequired
}

ImageEditorContainer.defaultProps = {
	imageUrl: ""
}

export default ImageEditorContainer;