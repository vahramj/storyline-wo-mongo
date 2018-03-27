import React from "react";
import { bool, arrayOf, element, oneOfType } from "prop-types";

import "./styles/Modal.css";

const Modal = props => {
	if(!props.show){
		return null;
	}
	return(
		<div className="modal-bg">
			{props.children}
		</div>
	);
}

Modal.propTypes = {
	show: bool,
	children: oneOfType([
		arrayOf(element),
		element
	])
}

Modal.defaultProps = {
	show: false,
	children: null
}

export default Modal;