import React from "react";

import "./styles/DetailField.css";

const CustomField = props => {
	const {
		headerText,
		id,
		name,
		type,
		input,
		checked,
		cols,
		rows,
		display = "vertical",
		required,
		meta
	} = props;

	const { touched, error } = meta;

	// let defaultChecked;
	// if(!touched && checked){
	// 	defaultChecked = checked;
	// }
	// console.log(props)
	let fieldElem = <input type={type} id={id} name={name} {...input} />;
	if (type === "textarea") {
		fieldElem = <textarea id={id} name={name} cols={cols} rows={rows} {...input} />;
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

export default CustomField;
