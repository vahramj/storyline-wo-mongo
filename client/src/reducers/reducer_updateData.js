
import { getData } from "../utils/appLogic";

const data = getData();

const updateData = (state = data, action) => {
	switch(action.type){
		default:
			return state
	}
}

export default updateData;