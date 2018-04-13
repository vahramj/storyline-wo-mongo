const formDataFields = {
	phase: ["name", "summary"],
	character: ["name", "gender", "age", "race", "description"],
	scene: ["name", "int_ext", "location", "time", "summary"]
};

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

	if (type === "character") {
		if(!initialValues.gender){
			initialValues.gender = "male";
		}
		else if (initialValues.gender !== "male" && initialValues.gender !== "female") {
			initialValues.gender = "other";
			initialValues.anotherGender = assetData.gender;
		}				
	}
	else if (type === "scene") {
		if (!initialValues.int_ext) {
			initialValues.int_ext = "int";
		}
	}

	return initialValues;
}

export const temp = "hello";