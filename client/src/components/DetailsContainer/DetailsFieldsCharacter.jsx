import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { func, bool } from "prop-types";

import DetailField from "./DetailField";

class DetailsFieldsCharacter extends Component {
	componentWillReceiveProps(nextProps) {
		const { handleSubmit, reset, getReduxFormFunctions, pristine } = nextProps;
		if(pristine !== this.props.pristine){
			getReduxFormFunctions({ handleSubmit, reset, pristine });
		}
	}

	render() {
		// console.log("rendering")
		return (
			<div>
				<div className="fieldset">
					<Field
						headerText="Character name"
						name="name"
						id="name"
						component={DetailField}
						type="text"
						required
					/>
				</div>

				<div className="fieldset">
					<Field
						headerText="Male"
						name="gender"
						id="male"
						value="male"
						component={DetailField}
						type="radio"
						display="horizontal"
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

					<Field
						// headerText="Another Gender"
						name="anotherGender"
						id="anotherGender"
						component={DetailField}
						type="text"
						display="horizontal"
					/>

				</div>
				
				<div className="fieldset">
					<Field
						headerText="Age"
						name="age"
						id="age"
						component={DetailField}
						type="text"
						required
					/>
				</div>

				<div className="fieldset">
					<Field
						headerText="Race/ethnicity"
						name="race"
						id="race"
						component={DetailField}
						type="text"
						required
					/>
				</div>

				<div className="fieldset">
					<Field
						headerText="Description"
						name="description"
						id="description"
						cols="60"
						rows="10"
						component={DetailField}
						type="textarea"
					/>
				</div>
			</div>
		);
	}
}

DetailsFieldsCharacter.propTypes = {
	handleSubmit: func.isRequired,
	reset: func.isRequired,
	getReduxFormFunctions: func.isRequired,
	pristine: bool.isRequired
};

function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = "Please provide name for the character";
	}

	if (!values.age) {
		errors.age = "Please provide age description for the character";
	}

	if (!values.race) {
		errors.race = "Please provide race or ethnicity description for the character";
	}
	if(values.gender === "other" && !values.anotherGender ){
		console.log(values.gender, values.anotherGender);
		errors.anotherGender = "Please specify gender";
	}

	return errors;
}

const reduxFormOptions = {
	validate,
	form: "characterForm"
};

export default reduxForm(reduxFormOptions)(DetailsFieldsCharacter);
