import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { func, bool } from "prop-types";

import DetailField from "./DetailField";

class DetailsFieldsPhase extends Component {
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps)
		const { handleSubmit, reset, getReduxFormFunctions, pristine } = nextProps;
		getReduxFormFunctions({ handleSubmit, reset, pristine });
	}
	
	render(){
		return (
			<div>
				<fieldset>
					<Field
						headerText="Phase name"
						name="name"
						id="name"
						component={DetailField}
						type="text"
						required
					/>
				</fieldset>

				<fieldset>
					<Field
						headerText="Summary"
						name="summary"
						id="summary"
						cols="60"
						rows="10"
						component={DetailField}
						type="textarea"
						required
					/>
				</fieldset>
			</div>
		);
	}
};

DetailsFieldsPhase.propTypes = {
	handleSubmit: func.isRequired,
	reset: func.isRequired,
	getReduxFormFunctions: func.isRequired,
	pristine: bool.isRequired
};

function validate(values) {
	// console.log(values)
	const errors = {};
	if (!values.name) {
		errors.name = "Please provide name for the phase";
	}
	if (!values.summary || values.summary.length < 15){
		errors.summary = "Please provide a summary at least 15 characters long";
	}
	return errors;
}

const reduxFormOptions = {
	validate,
	form: "phaseForm"
}

export default reduxForm(reduxFormOptions)(DetailsFieldsPhase);