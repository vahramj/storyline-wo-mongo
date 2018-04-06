import React from "react";
import { Field } from "redux-form";

import DetailField from "./DetailField";

const DetailsFieldsPhase = () => {
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
};

export default DetailsFieldsPhase;