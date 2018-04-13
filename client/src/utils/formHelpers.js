const formDataFields = {
	phase: ["name", "summary"],
	character: ["name", "gender", "age", "race", "description"],
	scene: ["name", "int_ext", "location", "time", "summary"]
};

const genderValues = ["male", "female"];
const raceValues = ["white", "black", "hispanic", "asian"];

export function getInitialValues(assetData, type) {
	// console.log("assetData: ", assetData);
	// const { type } = assetData;
	const initialValues = {};

	if(assetData){
		formDataFields[type].forEach(fieldName => {
			const fieldValue = assetData[fieldName];
			if(fieldValue){
				initialValues[fieldName] = fieldValue
			}
		});
	}
	// console.log("initialValues: ", initialValues)

	if (type === "character") {

		const genderInList = genderValues.some(race => race===initialValues.gender);
		// console.log(`${initialValues.gender} genderInList ${genderInList}`)
		if(!initialValues.gender){
			initialValues.gender = "male";
		}
		else if (!genderInList) {
			initialValues.anotherGender = initialValues.gender;
			initialValues.gender = "other";
		}

		const raceInList = raceValues.some(race => race===initialValues.race);
		if(!initialValues.race){
			initialValues.race = "white";
		}
		else if(!raceInList){
			initialValues.anotherRace = initialValues.race;
			initialValues.race = "other";
		}
	}
	else if (type === "scene") {
		if (!initialValues.int_ext) {
			initialValues.int_ext = "int";
		}
	}

	return initialValues;
}

export function getFinalValues(formValues){
	const relevantFormValues = Object.assign({}, formValues);
	if(relevantFormValues.gender === "other"){
		relevantFormValues.gender = relevantFormValues.anotherGender;
	}
	delete relevantFormValues.anotherGender;

	if(relevantFormValues.race === "other"){
		relevantFormValues.race = relevantFormValues.anotherRace;
	}
	delete relevantFormValues.anotherRace;

	return relevantFormValues;
}
