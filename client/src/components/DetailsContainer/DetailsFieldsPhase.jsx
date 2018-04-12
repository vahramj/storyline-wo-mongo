import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import DetailField from "./DetailField";

class DetailsFieldsPhase extends Component {
	componentWillMount(){
		const { handleSubmit, reset, getReduxFormFunctions } = this.props;
		getReduxFormFunctions({ handleSubmit, reset });
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