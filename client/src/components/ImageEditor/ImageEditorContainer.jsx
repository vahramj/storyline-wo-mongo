import React from "react";
import { string, func } from "prop-types";

import ContainerHeader from "../ContainerHeader";
import ImageEditor from "./ImageEditor";

import { frameSizes } from "../../utils/constants";

import "./styles/ImageEditorContainer.css";

const ImageEditorContainer = props => {
	const { imageUrl, type, hideImageEditor, setImageEditData, imageEditData } = props;
	const { frameWidth, frameHeight } = frameSizes[type];

	const imageEditorProps = {
		frameWidth,
		frameHeight,
		imageUrl,
		hideImageEditor,
		setImageEditData,
		imageEditData
	};
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
	type: string.isRequired,
	hideImageEditor: func.isRequired,
	setImageEditData: func.isRequired,

}

ImageEditorContainer.defaultProps = {
	imageUrl: ""
}

export default ImageEditorContainer;