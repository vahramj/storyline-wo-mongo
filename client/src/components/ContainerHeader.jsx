import React from "react";
import { string, element, arrayOf, oneOfType } from "prop-types";

import "./styles/ContainerHeader.css";

const ContainerHeader = (props) => {
	const { headerText } = props;
	return(
		<header className="container-header">
			<div className="h2Wrapper">
				<h2>{ headerText.toUpperCase() }</h2>
			</div>
			{props.children}
		</header>
	);
};

ContainerHeader.propTypes = {
	headerText: string,
	children: oneOfType([
		arrayOf(element),
		element
	])
};

ContainerHeader.defaultProps = {
	headerText: "",
	children: <div />
};

export default ContainerHeader;