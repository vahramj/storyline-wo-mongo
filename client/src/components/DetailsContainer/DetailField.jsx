import React from "react";
import { string, bool, shape } from "prop-types";

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
		meta
	} = props;
	// console.log(props)

	const { touched, error } = meta;

	let fieldElem = <input type={type} id={id} {...input} />;

	if (type === "textarea") {
		fieldElem = <textarea id={id} cols={cols} rows={rows} {...input} />;
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
}

DetailField.defaultProps = {
	headerText: "",
	cols: "60",
	rows: "10",
	display: "vertical",
	required: false,
}

export default DetailField;
