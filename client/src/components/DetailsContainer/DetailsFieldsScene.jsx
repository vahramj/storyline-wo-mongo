import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import DetailField from "./DetailField";

class DetailsFieldsScene extends Component {
	componentWillMount(){
		const { handleSubmit, getHandleSubmit } = this.props;
		getHandleSubmit(handleSubmit);
	}
	
	render(){	
		return (
			<div>
				<fieldset >
					<Field
						headerText="Scene name"
						name="name"
						id="name"
						component={DetailField}
						type="text"
						required
					/>
				</fieldset>

				<fieldset>
					<Field
						headerText="Int"
						name="int_ext"
						id="int"
						value="int"
						component={DetailField}
						type="radio"
						checked
						display="horizontal"
					/>

					<Field
						headerText="Ext"
						name="int_ext"
						id="ext"
						value="ext"
						component={DetailField}
						type="radio"
						display="horizontal"
					/>
				</fieldset>

				<fieldset >
					<Field
						headerText="Location"
						name="location"
						id="location"
						component={DetailField}
						type="text"
						required
					/>
				</fieldset>

				<fieldset >
					<Field
						headerText="Time"
						name="time"
						id="time"
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
					/>
				</fieldset>
			</div>
		);
	}
};

function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = "Please provide name for the scene";
	}
	if(!values.location) {
		errors.location = "Please specify the location of the scene";
	}
	if(!values.time) {
		errors.location = "Please specify the time when the scene takes place";
	}
	return errors;
}

const reduxFormOptions = {
	validate,
	form: "sceneForm"
}

export default reduxForm(reduxFormOptions)(DetailsFieldsScene);