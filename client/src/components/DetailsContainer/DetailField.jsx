import React from "react";

import "./styles/DetailField.css"

const CustomField = fieldProps => {
	const { headerText, id, name, type, input, meta, cols, rows, display="vertical" } = fieldProps;
	const { touched, error } = meta;
	// console.log(touched, error)

	let fieldElem = <input type={type} id={id} name={name} {...input} />;
	if (type === "textarea"){
		fieldElem = <textarea id={id} name={name} cols={cols} rows={rows} {...input} />
	}

	let fieldHelp = null; 
	if(touched && error){
		fieldHelp = <span className="field-error">({error})</span>
	}

	return (
		<div className={`detail-field ${display}-field`}>
			<label htmlFor={id}>
				<div>			
					<h3> {headerText} </h3>
					{ fieldHelp }
				</div>
				{ fieldElem }
			</label>
		</div>
	);
};

export default CustomField;