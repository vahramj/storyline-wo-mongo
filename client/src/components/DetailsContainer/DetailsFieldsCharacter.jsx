import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import DetailField from "./DetailField";

class DetailsFieldsCharacter extends Component {
	componentWillMount(){
		const { handleSubmit, getHandleSubmit } = this.props;
		getHandleSubmit(handleSubmit);
	}
	
	render(){	
		return (
			<div>
				<fieldset >
					<Field
						headerText="Character name"
						name="name"
						id="name"
						component={DetailField}
						type="text"
						required
					/>
				</fieldset>

				<fieldset>
					<Field
						headerText="Male"
						name="gender"
						id="male"
						value="male"
						component={DetailField}
						type="radio"
						display="horizontal"
						checked
					/>

					<Field
						headerText="Female"
						name="gender"
						id="female"
						value="female"
						component={DetailField}
						type="radio"
						display="horizontal"
					/>

					<Field 
						headerText="Other"
						name="gender"
						id="other"
						value="other"
						component={DetailField}
						type="radio"
						display="horizontal"
					/>
				</fieldset>

				<fieldset >
					<Field
						headerText="Age"
						name="age"
						id="age"
						component={DetailField}
						type="text"
						required
					/>
				</fieldset>

				<fieldset >
					<Field
						headerText="Race/ethnicity"
						name="race"
						id="race"
						component={DetailField}
						type="text"
						required
					/>
				</fieldset>

				<fieldset>
					<Field
						headerText="Description"
						name="description"
						id="description"
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
	if ( !values.name ) {
		errors.name = "Please provide name for the character";
	}

	if( !values.age ) {
		errors.age = "Please provide age description for the character";
	}

	if( !values.race ){
		errors.race = "Please provide race or ethnicity description for the character"
	}


	return errors;
}

const reduxFormOptions = {
	validate,
	form: "characterForm"
}

export default reduxForm(reduxFormOptions)(DetailsFieldsCharacter);