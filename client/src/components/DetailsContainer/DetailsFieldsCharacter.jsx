import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { func, bool, string } from "prop-types";
import _ from "lodash";

import DetailField from "./DetailField";

class DetailsFieldsCharacter extends Component {
	componentWillReceiveProps(nextProps) {
		const { handleSubmit, reset, getReduxFormFunctions, pristine } = nextProps;
		getReduxFormFunctions({ handleSubmit, reset, pristine });
	}

	render() {
		const { genderValue, raceValue } = this.props;
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
						disabled = { !(genderValue === "other") }
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
						type="select"
						required
						display="horizontal"
					>
						<option value="white"> white </option>
						<option value="black"> black </option>
						<option value="hispanic"> hispanic </option>
						<option value="asian"> asian </option>
						<option value="other"> other </option>
					</Field>

					<Field
						name="anotherRace"
						id="anotherRace"
						component={DetailField}
						type="text"
						display="horizontal"
						disabled = { !(raceValue === "other") }
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
	pristine: bool.isRequired,
	genderValue: string,
	raceValue: string,
};

DetailsFieldsCharacter.defaultProps = {
	genderValue: "",
	raceValue: ""
}

function validate(values) {
	const errors = {};
	// console.log("values: ", values)
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
		// console.log(values.gender, values.anotherGender);
		errors.anotherGender = "Please specify gender";
	}

	return errors;
}

const reduxFormOptions = {
	validate,
	form: "characterForm"
};

const selector = formValueSelector("characterForm");

function mapStateToProps(state){
	const genderValue = selector(state, "gender");
	const raceValue = selector(state, "race");
	// console.log("raceValue: ", raceValue)
	return { genderValue, raceValue }
}

const decorator = _.flowRight([
	reduxForm(reduxFormOptions),
	connect(mapStateToProps)
]);

export default decorator(DetailsFieldsCharacter);
