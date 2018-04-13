import React from "react";
import { string, bool, shape, oneOfType, arrayOf, element } from "prop-types";

import "./styles/DetailField.css";

const DetailField = props => {
	const {
		headerText,
		id,
		type,
		input,
		cols,
		rows,
		display = "vertical",
		required,
		disabled,
		meta,
		children
	} = props;
	// console.log(props)

	const { touched, error } = meta;

	let fieldElem = <input type={type} id={id} {...input} disabled={disabled} />;

	if (type === "textarea") {
		fieldElem = <textarea id={id} cols={cols} rows={rows} {...input} />;
	}
	else if(type === "select"){
		fieldElem = <select id={id} {...input}> {children} </select>
	}

	let requiredMark;
	if( required ){
		requiredMark = <span>*</span>
	}

	let fieldHelp = null;
	if (touched && error) {
		fieldHelp = <span className="field-error">({error})</span>;
	}

	return (
		<div className={`detail-field ${display}-field`}>
			<label htmlFor={id}>
				<div>
					<h3> {headerText} {requiredMark} </h3>
					{fieldHelp}
				</div>
				{fieldElem}
			</label>
		</div>
	);
};

DetailField.propTypes = {
	input: shape({
		name: string.isRequired,
	}).isRequired,
	meta: shape({
		touched: bool.isRequired,
		error: string
	}).isRequired,
	type: string.isRequired,
	id: string.isRequired,
	headerText: string,
	cols: string,
	rows: string,
	display: string,
	required: bool,
	disabled: bool,
	children: oneOfType([
			arrayOf(element),
			element
		])
}

DetailField.defaultProps = {
	headerText: "",
	cols: "60",
	rows: "10",
	display: "vertical",
	required: false,
	disabled: false,
	children: null
}

export default DetailField;
