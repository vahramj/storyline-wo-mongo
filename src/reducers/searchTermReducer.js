import update from "immutability-helper";

import { actionTypes } from "../utils/constants";

const { SET_SEARCH_TERM } = actionTypes;

const initialState = {
	phase: "",
	scene: "",
	character: ""
};

function searchTermReducer(state=initialState, action){
	if(action.type !== SET_SEARCH_TERM){
		return state;
	}
	const newState = update(state, {
		[action.payload.searchType]: {
			$set: action.payload.term
		}
	})

	return newState;
}

export default searchTermReducer;