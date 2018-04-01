import React from "react";
import {  } from "prop-types";

import ContainerHeader from "../ContainerHeader";
import ImageEditor from "./ImageEditor";

import "./styles/ImageEditorContainer.css";

const ImageEditorContainer = props => {
	return(
		<div className="image-editor-container">
			<ContainerHeader headerText="edit image" />
			<div className="image-editor-container-body">
				<ImageEditor { ...props } />
			</div>
		</div>
	);
}

ImageEditorContainer.propTypes = {

}

ImageEditorContainer.defaultProps = {
}

export default ImageEditorContainer;