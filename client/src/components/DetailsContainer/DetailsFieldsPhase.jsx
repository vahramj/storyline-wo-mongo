import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import DetailField from "./DetailField";

class DetailsFieldsPhase extends Component {
	componentWillMount(){
		const { handleSubmit, getHandleSubmit } = this.props;
		getHandleSubmit(handleSubmit);
	}
	
	render(){
		return (
			<div>
				<Field
					headerText="Name for phase"
					name="name"
					id="name"
					component={DetailField}
					type="text"
				/>

				<Field
					headerText="Summary"
					name="summary"
					id="summary"
					cols="60"
					rows="10"
					component={DetailField}
					type="textarea"
				/>
			</div>
		);
	}
};

function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = "Please provide name for the phase";
	}
	return errors;
}

const reduxFormOptions = {
	validate,
	form: "phaseForm"
}

export default reduxForm(reduxFormOptions)(DetailsFieldsPhase);